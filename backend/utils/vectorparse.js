import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CSVLoader } from '@langchain/community/document_loaders/fs/csv';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { MistralAIEmbeddings } from "@langchain/mistralai";
// import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeEmbeddings } from '@langchain/pinecone';
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import mammoth from 'mammoth';
import { Document } from 'langchain/document';
import { ApiError } from './api-errors.js';
const pinecone = new PineconeClient({
  apiKey: process.env.PINECONE_API_KEY,
  // environment: process.env.PINECONE_ENVIRONMENT // Add this line
});
  // 3. Generate Embeddings using Mistral LLM
  // const embeddings = new MistralAIEmbeddings({
  //   model: "mistral-embed",
  //   apiKey:process.env.MISTRAL_AI 
  // });

  const embeddings = new PineconeEmbeddings({
    model: "multilingual-e5-large",
    apiKey: process.env.PINECONE_API_KEY,
  });


const DocumentService = async (file, collegeId) => {
  let documents;

  try {
    if (!file || !file.path || !file.mimetype) {
      throw new Error('Invalid file input');
    }

    // 1. Load Document
    switch (file.mimetype) {
      case 'application/pdf':
        documents = await new PDFLoader(file.path).load();
        break;

      case 'text/csv':
        documents = await new CSVLoader(file.path).load();
        break;

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        const { value: text } = await mammoth.extractRawText({ buffer: file.buffer });
        documents = [new Document({ pageContent: text })];
        break;

      default:
        throw new ApiError(400, "Unsupported file type", [], "Please upload PDF, CSV, or DOCX.");
    }

    // 2. Split into Chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
      separators: ['\n\n', '\n', ' ', '']
    });

    const docs = await splitter.splitDocuments(documents);
    console.log('Documents Split:', docs.length);

  
// 4. Pinecone Vector DB

const index = pinecone.Index(process.env.PINECONE_INDEX);
    // Create index if not exists
    try {
      await pinecone.createIndex({
        name: process.env.PINECONE_INDEX,
        dimension: 1024, // For 'all-MiniLM-L6-v2' embeddings
        metric: 'cosine',
        spec: {
          serverless: { 
            cloud: 'aws', 
            region: 'us-east-1' 
          }
        }
        
      });
      console.log('Index created successfully');
    } catch (error) {
      if (!error.message.includes('already exists')) {
        throw new ApiError(500, "Index creation failed", [], error.message);  
      }
    }
    

    try {
     
      const namespace = `college-${collegeId}`;

      // Create vectors with proper structure
      const vectors = await Promise.all(
        docs.map(async (doc, idx) => ({
          id: `doc-${collegeId}-${new Date()}-${idx}`,
          values: await embeddings.embedQuery(doc.pageContent),
          metadata: {
            collegeId,
            text: doc.pageContent.substring(0, 500), // Store first 500 chars for reference
            source: file.originalname,
            page: doc.metadata?.page || 1
          }
        }))

      );

      // Batch upsert in chunks of 100 (Pinecone limit)
      const BATCH_SIZE = 400;
      for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
        const batch = vectors.slice(i, i + BATCH_SIZE);
        await index.namespace(namespace).upsert(batch);
      }

      console.log('Successfully upserted', vectors.length, 'vectors');
      return {
        success: true,
        documentCount: docs.length,
        message: "Document processed successfully",
        namespace,
      };
    } catch (error) {
      console.error('Pinecone error:', error);
      throw new ApiError(500, "Vector DB operation failed", [], error.message);
    }


  } catch (error) {
    console.error('Document processing error:', error);
    throw new ApiError(400, "Document not processed", [], error.message);
  }
};
const deleteDocument= async(namespace)=>{
  try {

   
    const index = pinecone.Index(process.env.PINECONE_INDEX);
   
    const indexList = await pinecone.listIndexes();
    console.log(indexList.indexes.some(index => index.name === process.env.PINECONE_INDEX))
    if (!indexList.indexes.some(index => index.name === process.env.PINECONE_INDEX)){
       
      throw new Error(`Index ${process.env.PINECONE_INDEX} not found`);
    }
     // Verify namespace exists
     const stats = await index.describeIndexStats();
     if (!stats.namespaces?.[namespace]) {
       return {
         success: true,
         message: "Namespace already empty",
       };
     }
    
    await index.namespace(namespace).deleteAll({
      filter:{}
    })
    return {
      success: true,
      message: "Document deleted successfully",
    }
  } catch (error) {
    console.error('Document deletion error:', error);
    throw new ApiError(400, "Document not deleted", [], error.message);
    
  }
}
const getContext = async(namespace,query)=>{
  try {
    const querryembings = await embeddings.embedQuery(query)
    const index = pinecone.Index(process.env.PINECONE_INDEX);
    const result = await index.namespace(namespace).query({
      topK: 5,
      vector: querryembings,
      includeMetadata: true,
      includeValues: false,
    })
    return result.matches.map((match) => ({
      id: match.id,
      score: match.score,
      text: match.metadata.text,
      page: match.metadata.page,
      source: match.metadata.source,
    }))
  } catch (error) {
    console.error('Error fetching context:', error);
    throw new ApiError(500, "Context fetch failed", [], error.message);
  }
}
export { DocumentService, deleteDocument, getContext };

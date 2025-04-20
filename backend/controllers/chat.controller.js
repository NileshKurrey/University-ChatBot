import { asyncHandler } from "../utils/async-handler.js";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/api-errors.js";
import { getContext } from "../utils/vectorparse.js";
import { ApiResponse } from "../utils/api-response.js";
import { ChatGroq } from "@langchain/groq";
import {ChatPromptTemplate}from '@langchain/core/prompts'
// Intialize Chats
const prisma = new PrismaClient();
const llm  = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature:0.4,
})
const ChatAi = asyncHandler(async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    const { collegeId } = req.params;
    const message =  'what is node js'; // Use dynamic input
  
    try {
      // Fetch college bot and context
      const collegebot = await prisma.collegeBot.findFirst({ where: { id: collegeId } });
      if (!collegebot) throw new ApiError(400, "College Bot not found", [], "University not found");
  
      const namespace = collegebot.vectorNamespace;
      const context = await getContext(namespace, message);
  
      // Create prompt with context
      const prompt = ChatPromptTemplate.fromMessages([
        ["system", "Answer based on the following context:\n\n{context}"],
        ["user", "{message}"],
      ]);
      const formattedPrompt = await prompt.format({ context, message });
  
      // Stream the response
      const stream = await llm.stream(formattedPrompt);
        let generate = ''
      // Send SSE events for each chunk
      for await (const chunk of stream) {
        generate += chunk.content;
    }
    console.log(generate)
    res.write(`data: ${JSON.stringify({ text: generate})}\n\n`);
  
      res.end();
    } catch (error) {
      console.error('Server Is Busy Try After some Time', error);
      res.status(500).json(new ApiResponse(500,'','Server Is Busy Try after some time')).end();
    }
  });
export {ChatAi}
// Add Chat Sessions
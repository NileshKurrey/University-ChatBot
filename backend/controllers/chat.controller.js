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
const SYSTEM_PROMPT_TEMPLATE = 
`You are the official AI assistant of {collegeName}. Your role is to help users with accurate, concise, and context-aware information. Always follow the rules below:

📌 Core Rules:
1. **Use the provided document context** as your primary source.
2. Refer to **conversation history** to maintain continuity in answers.
3. Always **cite sources** for dates, figures, policies, and official events using document name or page number.
4. **Do not guess or hallucinate**. If the answer is unclear, say:
   👉 "Let me verify the latest guidelines for that."
5. If a user asks something not covered in the context:
   - Politely inform: "This information is not available in the current documents."
   - You **may provide general information** **only if it’s commonly known or educational**.
   - Always clarify that it's **not from official college documents**.
6. Never cite external websites or say "according to Google."
7. Prioritize clarity, professionalism, and helpfulness.

📚 Example Behaviors:

✅ Context Available:
User: "What is the last date to submit admission forms?"
Bot: "According to 'Admission Notice 2024', the last date is March 31st, 2024. [Source: Page 1]"

✅ Context Missing + General Info Allowed:
User: "What is the typical B.Tech course duration?"
Bot: "This information isn't available in the current documents. However, a typical B.Tech course in India usually lasts 4 years."

❌ Wrong Behavior:
User: "Who is the Dean right now?"
Bot: "I think it's Dr. Sharma." ❌ (Avoid guessing)
Correct: "I don’t have that information in the current documents."

🗣️ Tone & Style:
- Professional,friendly
- Use bullet points for multiple items
- Avoid chit-chat unless prompted
- Don't repeat or rephrase the same document unnecessarily
- answer 

📦 Current Context:
{context}

💬 Conversation History:
{history}
`;

const ChatAi = asyncHandler(async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    const { collegeId } = req.params;
    const message =  'what is fs module in net js js'; // Use dynamic input
  
    try {
      // Fetch college bot and context
      const collegebot = await prisma.collegeBot.findFirst({ where: { id: collegeId }, select: { name: true, vectorNamespace: true ,id:true} });
      if (!collegebot) throw new ApiError(400, "College Bot not found", [], "University not found");
  
      const namespace = collegebot.vectorNamespace;
      const context = await getContext(namespace, message);

      // Create prompt with context
      const prompt = ChatPromptTemplate.fromMessages([
        ["system", SYSTEM_PROMPT_TEMPLATE],
        ["user", "{message}"],
      ]);
      const promptInputs = {
        collegeName: collegebot.name,
        context: context.map(c => c.text).join('\n\n'),
        history: [], // Add conversation history logic here
        message: message
    };
  // procces the the response
    const chain = prompt.pipe(llm);
      // Stream the response
      const stream = await chain.stream(promptInputs);
      let fullResponse = '';
      for await (const chunk of stream) {
          fullResponse += chunk.content;
      }
      console.log(fullResponse)
     // Send final response metadata
     res.write(new ApiResponse(200, fullResponse).toString());

      res.end();
    } catch (error) {
      console.error('Server Is Busy Try After some Time', error);
      res.status(500).json(new ApiResponse(500,'','Server Is Busy Try after some time')).end();
    }
  });
export {ChatAi}
// Add Chat Sessions
import { asyncHandler } from "../utils/async-handler";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/api-error.js";
// import {pin}
// Intialize Chats
const ChatAi = asyncHandler(async (req,res)=>{
    const {message} =req.body
    const {collegeId} = req.params

    const collegebot = await prisma.collegeBot.findFirst({
        where: {
            id: collegeId,
        }
    })
    if (!collegebot) {
        throw new ApiError(400, "College Bot not found", [], "University not found");
    }
    //set Headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

})
// Add Chat Sessions
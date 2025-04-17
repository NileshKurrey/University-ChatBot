import { ApiError } from "../utils/api-errors.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import {PrismaClient}from '@prisma/client'
import {DocumentService} from '../utils/vectorparse.js'
// create new University ChatBot
const prisma = new PrismaClient()
 const CreateUni =asyncHandler(async (req, res) => {
    const data = JSON.parse(req.body.mybody)
    const { name, description, logo, collegeUrl,clerkId} = data;
    
    const files = req.files
    if(!name || !description || !logo || !collegeUrl ) {
        throw new ApiError(400, "All fields are required", [], "All fields are required");
    }
    if(!clerkId) {
        throw new ApiError(403, "Unauthorized", [], "User ID is required");
    }
    
    if(files.length === 0) {
        throw new ApiError(400, "Atleast One document require", [], "one docoument is required for Vector store and context aware");
    }
    const isExist = await prisma.collegeBot.findFirst({
        where: {
            name: name,
        }
    })
    
    if(isExist) {
        throw new ApiError(400, "University already exists", [], "University already exists");
    }
    console.log('we are here')
    // const tempNamespace = `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    let university = await prisma.collegeBot.create({
        data: {
            name,
            description,
            logo,
            collegeUrl,
            clerkId,
            vectorNamespace:null
        }
    })
    console.log(university)
    if(!university) {
        throw new ApiError(400, "University not created", [], "University not created");
    }
    const collegeId = university.id
    let namespace;
    files.forEach(async (file)=>{
        console.log(file)
       const parsedData =  await DocumentService(file, collegeId)
       if(parsedData.success){
        await prisma.document.create({
            data:{
                collegeId,
                fileName: file.originalname,
                fileType: file.mimetype,
               
            }
        })
        if (!namespace) {
            namespace = parsedData.namespace;
        }
       }
       else{
           await prisma.collegeBot.delete({
            where: {
                id: collegeId,
            }
           })
        throw new ApiError(400, "Document not processed", [], "Document not processed");
       }

    })
    // Update the collegeBot with the namespace
    console.log('vectorNamespace',namespace)      
     let collegebot = await prisma.collegeBot.update({
        where: {
            id: collegeId,
        },
        data: {
            vectorNamespace:namespace,
        }
    })
    console.log('university',collegebot)
    return res.status(201).json(new ApiResponse(201, collegebot,"University Bot Created Successfully" ))
})

// Add University Data
// add University docs
// update University Chatbot
// Get University All Chatbot
// Get University Data by Id

//get All Users
// Update User
// Delete User
// Get User By ID

// total admins
// make admin
// unmake admin


export {CreateUni}
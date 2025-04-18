import { ApiError } from "../utils/api-errors.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { PrismaClient } from '@prisma/client'
import { deleteDocument, DocumentService } from '../utils/vectorparse.js'
// create new University ChatBot
const prisma = new PrismaClient()
const CreateUni = asyncHandler(async (req, res) => {
    const data = JSON.parse(req.body.mybody)
    const { name, description, logo, collegeUrl, clerkId } = data;

    const files = req.files

    if (!name || !description || !logo || !collegeUrl) {
        throw new ApiError(400, "All fields are required", [], "All fields are required");
    }
    if (!clerkId) {
        throw new ApiError(403, "Unauthorized", [], "User ID is required");
    }

    if (files.length === 0) {
        throw new ApiError(400, "Atleast One document require", [], "one docoument is required for Vector store and context aware");
    }
    const isExist = await prisma.collegeBot.findFirst({
        where: {
            name: name,
        }
    })

    if (isExist) {
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
            vectorNamespace: null
        }
    })
    console.log(university)
    if (!university) {
        throw new ApiError(400, "University not created", [], "University not created");
    }
    const collegeId = university.id
    let namespace;
    for (const file of files) {
        const parsedData = await DocumentService(file, collegeId);
        if (parsedData.success) {
            await prisma.document.create({
                data: {
                    collegeId,
                    fileName: file.originalname,
                    fileType: file.mimetype,
                },
            });

            if (!namespace) {
                namespace = parsedData.namespace;
            }
        } else {
            await prisma.collegeBot.delete({ where: { id: collegeId } });
            throw new ApiError(400, "Document not processed", [], "Document not processed");
        }
    }
    // Update the collegeBot with the namespace
    console.log('vectorNamespace', namespace)
    let collegebot = await prisma.collegeBot.update({
        where: {
            id: collegeId,
        },
        data: {
            vectorNamespace: namespace,
        }
    })
    console.log('university', collegebot)
    return res.status(201).json(new ApiResponse(201, collegebot, "University Bot Created Successfully"))
})

// Add University docs
const AddUniversityData = asyncHandler(async (req, res) => {
    const { collegeId } = req.params
    const files = req.files
    let collegebot = await prisma.collegeBot.findFirst({
        where: {
            id: collegeId,
        }
    })
    if (!collegebot) {
        throw new ApiError(400, "College Bot not found", [], "University not found");
    }
    if (files.length === 0) {
        throw new ApiError(400, "Atleast One document require", [], "one docoument is required for Vector store and context aware");
    }
    let documents = []
    for (const file of files) {
        const parsedData = await DocumentService(file, collegeId);
        try {
            if (parsedData.success) {
                let document = await prisma.document.create({
                    data: {
                        collegeId,
                        fileName: file.originalname,
                        fileType: file.mimetype,
                    },
                });
                documents.push(document)
            }

        }
        catch (error) {

            throw new ApiError(400, "Document not processed", [], "Document not processed");
        }

    } 
    return res.status(201).json(new ApiResponse(201, documents, "Documents uploaded Successfully"))
})

// update University Chatbot

  const updateBot = asyncHandler(async (req, res) => {
    const { collegeId } = req.params
    const data = req.body
    const { name, description, logo, collegeUrl } = data;
    let collegebot = await prisma.collegeBot.findFirst({
        where: {
            id: collegeId,
        }
    })
    if (!collegebot) {
        throw new ApiError(400, "College Bot not found", [], "University not found");
    }
    let updatedBot = await prisma.collegeBot.update({
        where: {
            id: collegeId,
        },
        data: {
            name,
            description,
            logo,
            collegeUrl
        }
    })
    return res.status(200).json(new ApiResponse(200, updatedBot, "University Bot Updated Successfully"))
})
// Get University All Chatbot
const GetAllUniversity = asyncHandler(async (req,res) => {
    const university = await prisma.collegeBot.findMany({
        include: {
            documents: true,
        }
    })
    return res.status(200).json(new ApiResponse(200, university, "successfully fetched all University Bot"))
})
// Get University Data by Id
const getBot = async(req,res)=>{
    const {collegeId} = req.params
    const collegetbot = await prisma.collegeBot.findFirst({
        where:{
            id:collegeId
        }
    })
    if(!collegetbot){
        throw new ApiError(400, "College Bot not found", [], "University not found");
    }
    return res.status(200).json(new ApiResponse(200, collegetbot, `successfully fetched ${collegetbot.name} University Bot`))
}
// Delete University Chatbot
const deleteBot = asyncHandler(async (req, res) => {
    const { collegeId } = req.params
    const collegebot = await prisma.collegeBot.findFirst({
        where: {
            id: collegeId,
        }
    })
    if (!collegebot) {
        throw new ApiError(400, "College Bot not found", [], "University not found");
    }
   const namespace = collegebot.vectorNamespace
    const deleteVectors = await deleteDocument(namespace)
    if (!deleteVectors) {
        throw new ApiError(400, "Vectors not deleted", [], "Vectors not deleted");
    }
    if(deleteVectors.success == false){
        throw new ApiError(400, "Vectors not deleted", [], "Vectors not deleted");
        
    }
    await prisma.document.deleteMany({
        where: {
            collegeId: collegeId,
        }
    })
    await prisma.collegeBot.delete({
        where: {
            id: collegeId,
        }
    })
    return res.status(200).json(new ApiResponse(200, {}, "University Bot Deleted Successfully"))
})
//get All Users
// Update User
// Delete User
// Get User By ID
// total admins
// make admin
// unmake admin


export { CreateUni, AddUniversityData, updateBot,GetAllUniversity,getBot,deleteBot };
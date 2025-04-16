import express from'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { Clerk } from '@clerk/clerk-sdk-node'
dotenv.config({
    path: "./.env",
  });

const app = express();
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS","Cookie"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
}))
app.use(cookieParser())
app.use(express.urlencoded({extended:'true'}))


//clerk Authentication 
const clerk = new Clerk(process.env.CLERK_API_KEY)
app.use(clerk.expressWithAuth({
    apiKey: process.env.CLERK_API_KEY,
    apiVersion: 2,
}))
const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`App is litening at Port ${PORT}`)
})
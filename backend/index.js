import express from'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
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
app.use(express.json())


//clerk Authentication 
app.use(clerkMiddleware(
    { apiKey: process.env.CLERK_API_KEY, apiVersion: 2, frontendApi: process.env.CLERK_FRONTEND_API }
    ))

const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`App is litening at Port ${PORT}`)
})
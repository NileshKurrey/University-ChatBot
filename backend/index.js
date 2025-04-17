import express from'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import adminRoutes from './routes/admin.route.js'
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
    { apiKey: process.env.CLERK_SECRET_KEY, apiVersion: 2, }
    ))

    //Admin Routes
app.use('/api/v1/admin', adminRoutes)

const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`App is litening at Port ${PORT}`)
})
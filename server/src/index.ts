import express from 'express';
import dotenv from 'dotenv'
import dbConnect from './config/dbConnection';
import userRouter from './routes/userRouter'
import cors from 'cors'
const app = express()

dotenv.config()
dbConnect()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = process.env.PORT || 4000

app.use('/',userRouter)

app.listen(port,()=>{
    console.log(`server running on ${port}`); 
})
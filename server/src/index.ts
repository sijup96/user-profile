import express from 'express';
import dotenv from 'dotenv'
import dbConnect from './config/dbConnection';

dotenv.config()
dbConnect()
const app = express()
const port = process.env.PORT || 4000

app.get('/',(req,res)=>{
    res.send('helloo ')
})

app.listen(port,()=>{
    console.log(`server running on ${port}`);
    
})
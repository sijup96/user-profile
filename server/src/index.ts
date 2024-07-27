import express from 'express';
import dotenv from 'dotenv'
import dbConnect from './config/dbConnection';
import userRouter from './routes/userRouter'
import adminRouter from './routes/adminRouter'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import {cloudinaryConfig} from './config/cloudinary';
const app = express()

dotenv.config()
cloudinaryConfig()
dbConnect()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json({ limit: '50mb' })); 
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const port = process.env.PORT || 4000

app.use('/', userRouter)
app.use('/admin',adminRouter)

app.listen(port, () => {
    console.log(`server running on ${port}`);
})
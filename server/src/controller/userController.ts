import { Request, Response } from "express";
import User from "../models/userModel";
import asyncHandler from 'express-async-handler'

const userHome =asyncHandler(async(req:Request,res:Response):Promise<void>=>{
    try {
        console.log(req.body);
        
        
    } catch (error) {
     res.status(500).json({message:"internal server error."})
    }
})
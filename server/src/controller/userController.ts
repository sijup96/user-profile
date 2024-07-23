import { Request, Response } from "express";
import User from "../models/userModel";
import asyncHandler from 'express-async-handler'
import { validateUser } from '../utils/validate';

export const signUp =asyncHandler(async(req:Request,res:Response):Promise<void>=>{
    try {
        const {name,email,password}=req.body
        const existingUser= await User.find({email})
        if(existingUser.length){
         res.status(400).json({message:"existingUser"})
         return
        }
        const {isValid,errors}=validateUser({name,email,password})
        if(!isValid){
            res.status(401).json({errors})
            return
        }
        const newUser=await User.create({
            name:name,
            email:email,
            password:password
        })        
        res.status(201).json({name:newUser.name,email:newUser.email}) 
    } catch (error) {
     res.status(500).json({message:"internal server error."})
    }
})
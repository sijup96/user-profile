import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { generateRefreshToken } from '../config/jwtRefreshToken';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const userMiddleware = asyncHandler(async (req, res,next) => {
    try {
        const { token } = req.body
        if (!token) {
            res.status(404).json({ message: "Token not found" })
            return
        }
        const user = await User.findOne({ refreshToken: token })
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return
        }
        const secret = process.env.JWT_SECRET || ''
        
        jwt.verify(token, secret, (err:any, decode:any) => {            
            if(err || user.id !==decode.id.id){
                res.status(400).json({message:"token error"})
                return
            }
            next()
        })
    } catch (error) {
        res.status(500)
        return
    }
})

export const isAdmin=asyncHandler(async(req,res,next)=>{
    try {
        const refreshToken=req.body.token
        
    } catch (error) {
        
    }
})
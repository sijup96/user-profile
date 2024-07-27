import { Request, Response } from "express";
import User from "../models/userModel";
import asyncHandler from 'express-async-handler'
import { validateUser } from '../utils/validate';
import { generateRefreshToken } from "../config/jwtRefreshToken";
import { v2 as cloudinary } from 'cloudinary';

// User signUp
export const signUp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.find({ email })
        if (existingUser.length) {
            res.status(400).json({ message: "existingUser" })
            return
        }
        const { isValid, errors } = validateUser({ name, email, password })
        if (!isValid) {
            res.status(401).json({ errors })
            return
        }
        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        })
        // Generate JWT token
        const token = generateRefreshToken({ id: newUser._id })
        await User.findByIdAndUpdate(newUser._id, { refreshToken: token }, { new: true })
        res.status(201).json({ name: newUser.name, email: newUser.email, token: token })
    } catch (error) {
        res.status(500).json({ message: "internal server error." })
    }
})

// User signIn
export const signIn = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (user && (await user.comparePassword(password))) {
            const refreshToken = generateRefreshToken({ id: user._id })
            await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken }, { new: true })
            // Store refreshToken into cookies
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000,
                sameSite: 'lax',
                secure: false
            });
            const data = {
                email: user.email,
                name: user.name,
                image: user.image,
                token: refreshToken
            }
            res.status(200).json({ success: true, data })
        } else {
            res.status(404).json({ message: "noUserFound" })
        }
    } catch (error) {
        res.status(500)
    }
})

// Logout
export const logout = asyncHandler(async (req, res) => {
    try {
        const { token } = req.body
        const isLogout = await User.findOneAndUpdate(
            { refreshToken: token },
            { refreshToken: "" }
        )
        if (!isLogout) {
            res.status(404).json({ message: "user not found" })
            return
        } else {
            res.status(200).json({ status: true })
        }
    } catch (error) {
        res.status(500)
    }
})
// Update Profile
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { name, email, password, userImage, token } = req.body
        const user = await User.findOne({ refreshToken: token })
        if (!user) {
            res.status(404).json({ message: "user not found" })
            return
        }
        if (!await user.comparePassword(password)) {
            res.status(400).json({ message: 'Invalid password' })
            return
        }
        if (userImage) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(userImage, {
                    upload_preset: 'gc9hq05h',
                    public_id: `${name}avatar`,
                    allowed_formats: ['png', "jpg", "jpeg", 'svg', 'ico', 'jfif', 'webp']
                },
                )
                .catch((error) => {
                    console.log(error);
                });

            const updatedUser = await User.findOneAndUpdate({ refreshToken: token }, { name, image: uploadResult?.url })
            if (!updatedUser) {
                res.status(400).json({ message: "user not updated" })
                return
            }
        }else{
            const updatedUser = await User.findOneAndUpdate({ refreshToken: token }, { name })
            if (!updatedUser) {
                res.status(400).json({ message: "user not updated" })
                return
            } 
        }
        const newUser=await User.findOne({refreshToken:token})
        const data = {
            email: newUser?.email,
            name: newUser?.name,
            image: newUser?.image,
            token: newUser?.refreshToken
        }
        res.status(200).json({ success: true, data })
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "server error" })
    }
})
export const userExist=asyncHandler(async(req,res)=>{
const {token}=req.body.data
const user=await User.findOne({refreshToken:token})
if(!user){
    res.json({status:false})
    return
}
return
})
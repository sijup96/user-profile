import Admin from "../models/adminModel"
import asyncHandler from 'express-async-handler';
import User from "../models/userModel";
import { generateRefreshToken } from "../config/jwtRefreshToken";
import { v2 as cloudinary } from 'cloudinary';

export const adminLogin = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findOne({ email: email })
        if (!admin || admin?.password !== password) {
            res.status(404).json({ message: "invalid credentials" })
            return
        }
        const refreshToken = generateRefreshToken({ id: admin._id })
        await Admin.findByIdAndUpdate(admin._id, { refreshToken: refreshToken }, { new: true })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
            sameSite: 'lax',
            secure: false
        });
        if (admin && admin.password === password) {
            const data = {
                email,
                token: refreshToken
            }
            res.status(200).json({ success: true, data })
        }
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})
export const getAllUser = asyncHandler(async (req, res) => {
    try {
        const userData = await User.find().select('-password')
        res.status(200).json({ userData })
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
})

export const deleteUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id
        const isDeleted = await User.findByIdAndDelete(userId)
        if (!isDeleted) {
            res.status(404).json({ message: "user not found" })
            return
        }
        const response = await cloudinary.api.delete_resources(['sijuavatar'],
            {
                type: 'upload', resource_type: 'image'
            })
        console.log(response);
        res.status(200).json({ success: true })

    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})
export const getUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId).select('-password')
        if (!user) {
            res.status(404).json({ message: "user not found" })
            return
        }
        res.status(200).json({ user })
    } catch (error) {

    }
})
export const profileUpdate = asyncHandler(async (req, res) => {
try {
    const userId = req.params.id
    const { name, image } = req.body    
    if (image) {
        // Upload an image
        const uploadResult = await cloudinary.uploader
            .upload(image, {
                upload_preset: 'gc9hq05h',
                public_id: `${name}avatar`,
                allowed_formats: ['png', "jpg", "jpeg", 'svg', 'ico', 'jfif', 'webp']
            },
            )
            .catch((error) => {
                console.log(error);
            });

        const updatedUser = await User.findByIdAndUpdate(userId, { name, image: uploadResult?.url })
        if (!updatedUser) {
            res.status(400).json({ message: "user not updated" })
            return
        }
    }else{
        const updatedUser = await User.findByIdAndUpdate(userId, { name })
        if (!updatedUser) {
            res.status(400).json({ message: "user not updated" })
            return
        }
    }
    res.status(200).json(({success:true}))
} catch (error) {
    res.json(500)
}
})
import jwt from "jsonwebtoken";

export const generateRefreshToken=(id:object)=>{
    const secret=process.env.JWT_SECRET
    if(secret)
    return jwt.sign({id},secret,({expiresIn:"3d"}))
}
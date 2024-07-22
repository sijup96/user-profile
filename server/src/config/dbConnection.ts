import mongoose from "mongoose";

const dbConnect=async():Promise<void>=>{
    const mongoURL=process.env.MONGODB_URL
    try {
        if(!mongoURL)
            throw new Error('URL not found..')
        await mongoose.connect(mongoURL)
        console.log('db connected'); 
    } catch (error) {
        if (error instanceof Error) {
            console.error('db error', error.message);
        } else {
            console.error('Unexpected error', error);
        }
        
    }
}
export default dbConnect
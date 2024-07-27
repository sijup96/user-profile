import mongoose, { Document, Schema } from "mongoose";
interface AdminTypes extends Document {
    email: string;
    password: string;
}

const AdminSchema: Schema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true
})
const Admin = mongoose.model<AdminTypes>('Admin', AdminSchema)
export default Admin
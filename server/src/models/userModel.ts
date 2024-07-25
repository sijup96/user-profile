import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs"

interface UserTypes extends Document {
    name: string;
    email: string;
    password: string;
    image?:string;
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    image: {
        type: String
    },
    password: {
        type: String
    },
    refreshToken: {
        type: String,
    },
    profileImage: {
        type: String
    }
},
    {
        timestamps: true
    })

UserSchema.pre<UserTypes>('save', async function (next) {
    if (!this.isModified('password'))
        return next()
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next()
    } catch (error: any) {
        next(error)
    }
});
// Compare Password
UserSchema.methods.comparePassword = async function (enteredPassword: string) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<UserTypes>('User', UserSchema)
export default User
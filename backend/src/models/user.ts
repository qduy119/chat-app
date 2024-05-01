import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
    fullName: string;
    username: string;
    password: string;
    gender: string;
    avatar: string;
    correctPassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        gender: {
            type: String,
            required: true,
            default: "male",
        },
        avatar: {
            type: String,
            default:
                "https://res.cloudinary.com/dlzyiprib/image/upload/v1694681041/e-commerces/user/jl0pusg7qckc6jvag8un.jpg",
        },
    },
    { timestamps: true }
);

userSchema.pre<UserDocument>("save", async function (next) {
    const salt = await bcrypt.genSalt(16);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.correctPassword = async function (
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;

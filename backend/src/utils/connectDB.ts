import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error connecting to MongoDB", error.message);
        }
    }
};

export default connectDB;

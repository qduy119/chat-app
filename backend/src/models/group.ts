import mongoose, { Document } from "mongoose";

interface GroupDocument extends Document {
    name: string,
    thumbnail: string,
    creator: mongoose.Types.ObjectId;
}

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            default:
                "https://res.cloudinary.com/dlzyiprib/image/upload/v1712028370/chat-app/images/wu9xet8l1v2cnbrsjrox.png",
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Group = mongoose.model<GroupDocument>("Group", groupSchema);

export default Group;

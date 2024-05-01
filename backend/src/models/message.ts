import mongoose, { Document } from "mongoose";

interface MessageDocument extends Document {
    senderId: mongoose.Types.ObjectId;
    receiverId?: mongoose.Types.ObjectId;
    message: string;
    images: mongoose.Types.Array<string>;
}

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        message: {
            type: String,
        },
        images: {
            type: Array,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model<MessageDocument>("Message", messageSchema);

export default Message;

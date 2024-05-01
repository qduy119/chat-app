import mongoose from "mongoose";

interface ConversationDocument extends Document {
    participants: mongoose.Types.Array<mongoose.Types.ObjectId>;
    messages: mongoose.Types.Array<mongoose.Types.ObjectId>;
    group?: mongoose.Types.ObjectId;
}

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
                default: [],
            },
        ],
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
        },
    },
    { timestamps: true }
);

const Conversation = mongoose.model<ConversationDocument>(
    "Conversation",
    conversationSchema
);

export default Conversation;

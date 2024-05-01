import { Request, Response } from "express";
import Conversation from "../models/conversation";
import Message from "../models/message";
import { getReceiverSocketId, io } from "../socket/socket";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const files = req.files;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const images = [];
        if (Array.isArray(files)) {
            if (files) {
                for (const file of files) {
                    images.push(file.path);
                }
            }
        }
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
            group: null,
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            images,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);
        const messageToSend = await newMessage.populate({
            path: "senderId",
            model: "User",
            select: "-password",
        });
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", messageToSend);
        }

        res.status(200).json(messageToSend);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error in sendMessage controller: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
            group: null,
        }).populate({
            path: "messages",
            populate: {
                path: "senderId",
                model: "User",
                select: "-password",
            },
        });

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error in sendMessage controller: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

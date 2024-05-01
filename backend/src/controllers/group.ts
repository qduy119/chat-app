import { Request, Response } from "express";
import Group from "../models/group";
import Message from "../models/message";
import { getReceiverSocketId, io } from "../socket/socket";
import Conversation from "../models/conversation";

export const getGroups = async (req: Request, res: Response) => {
    try {
        const id = req.user._id;
        const group = await Conversation.find({
            participants: {
                $in: id,
            },
            group: {
                $ne: null,
            },
        })
            .populate("group")
            .populate({
                path: "participants",
                model: "User",
                select: "-password",
            });
        res.status(200).json(group);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error in getGroups controller: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const createGroup = async (req: Request, res: Response) => {
    try {
        let { name, participants } = req.body;
        const thumbnail = req.file?.path;
        const creator = req.user._id;
        const group = await Group.create({
            name,
            thumbnail,
            creator,
        });
        participants = Array.isArray(participants)
            ? participants
            : [participants];
        if (group) {
            const conversation = await Conversation.create({
                group: group._id,
                participants: [...participants, creator],
            });
            const result = await Conversation.findById(conversation._id)
                .populate("group")
                .populate({
                    path: "participants",
                    model: "User",
                    select: "-password",
                });
            for (const participant of participants) {
                const receiverSocketId = getReceiverSocketId(participant);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("newGroup", result);
                }
            }
            return res.status(200).json(result);
        }
        res.status(200).json();
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error in createGroup controller: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const addMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { participants } = req.body;
        let conversation = await Conversation.findById(id);
        if (conversation) {
            conversation.participants.push(...participants);
            await conversation.save();
            conversation = await Conversation.findById(id)
                .populate("group")
                .populate({
                    path: "participants",
                    model: "User",
                    select: "-password",
                });
            for (const participant of participants) {
                const receiverSocketId = getReceiverSocketId(participant);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("newGroup", conversation);
                }
            }
        }
        res.status(200).json(conversation);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error in addMember controller: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const sendMessageInGroup = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const files = req.files;
        const { id } = req.params;
        const senderId = req.user._id;

        const images = [];
        if (Array.isArray(files)) {
            if (files) {
                for (const file of files) {
                    images.push(file.path);
                }
            }
        }
        const conversation = await Conversation.findById(id);
        const newMessage = new Message({
            senderId,
            message,
            images,
        });
        const messageToSend = await newMessage.populate({
            path: "senderId",
            model: "User",
            select: "-password",
        });

        if (newMessage && conversation) {
            conversation.messages.push(newMessage._id);
            await Promise.all([conversation.save(), newMessage.save()]);
            const listParticipants = conversation.participants.filter(
                (participant) => !participant._id.equals(senderId)
            );
            for (const participant of listParticipants) {
                const receiverSocketId = getReceiverSocketId(
                    String(participant)
                );
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit(
                        "newGroupMessage",
                        messageToSend
                    );
                }
            }
        }
        res.status(200).json(messageToSend);
    } catch (error) {
        if (error instanceof Error) {
            console.log(
                "Error in sendMessageInGroup controller: ",
                error.message
            );
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const getMessagesInGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const conversation = await Conversation.findById(id).populate({
            path: "messages",
            populate: {
                path: "senderId",
                model: "User",
                select: "-password",
            },
        });
        if (!conversation) return res.status(404).json();
        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        if (error instanceof Error) {
            console.log(
                "Error in getMessagesInGroup controller: ",
                error.message
            );
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

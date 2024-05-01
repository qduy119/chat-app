import { Request, Response } from "express";
import User from "../models/user";

export const getUsersForSidebar = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId },
        }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error in sendMessage controller: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

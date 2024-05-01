import { Request, Response } from "express";
import User from "../models/user";
import generateTokenAndSetCookie from "../utils/generateToken";
import randAvatar from "../utils/randAvatar";

export const signup = async (req: Request, res: Response) => {
    try {
        const { fullName, username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const newUser = new User({
            fullName,
            username,
            password,
            avatar: randAvatar(),
        });

        if (newUser) {
            await newUser.save();

            res.status(200).json({});
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error in signup controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        let isPasswordCorrect;
        if (user) {
            isPasswordCorrect = await user.correctPassword(password);
        }

        if (!user || !isPasswordCorrect) {
            return res
                .status(400)
                .json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            avatar: user.avatar,
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error in signup controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

export const logout = (req: Request, res: Response) => {
    try {
        res.cookie("jwt", null, { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error in signup controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

import { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateTokenAndSetCookie = (
    userId: mongoose.Types.ObjectId,
    res: Response
) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES,
    });

    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true, // XSS attacks
        sameSite: "strict", // CSRF
        secure: process.env.NODE_ENV !== "development",
    });
};

export default generateTokenAndSetCookie;

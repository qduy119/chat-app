import multer from "multer";
import { NextFunction, Request, Response } from "express";
import { upload } from "../utils/cloudinary";

export const imagesUpload = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    upload.array("images", 3)(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            return res.status(400).json({
                error: `File upload error: ${error.message} (maximum 3 images)`,
            });
        } else if (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
        next();
    });
};

export const imageUpload = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    upload.single("thumbnail")(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            return res.status(400).json({
                error: `File upload error: ${error.message} (maximum 3 images)`,
            });
        } else if (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
        next();
    });
};

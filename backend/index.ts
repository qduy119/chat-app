import connectDB from "./src/utils/connectDB";
import authRoutes from "./src/routes/auth";
import messageRoutes from "./src/routes/message";
import userRoutes from "./src/routes/user";
import groupRoutes from "./src/routes/group";
import { app, server } from "./src/socket/socket";
import { NextFunction, Request, Response } from "express";

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);

interface CustomError extends Error {
    status?: string;
    statusCode?: number;
}

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const error: CustomError = new Error(
        `Can't find ${req.originalUrl} on server`
    );
    error.status = "Error";
    error.statusCode = 404;
    next(error);
});

app.use(
    (error: CustomError, req: Request, res: Response, next: NextFunction) => {
        error.statusCode = error.statusCode || 500;
        error.status = error.status || "Something went wrong";
        res.status(error.statusCode).json(error.message);
    }
);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server Running on port ${PORT}`);
});

process.on("unhandledRejection", (err: Error) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

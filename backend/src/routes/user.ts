import express from "express";
import protectRoute from "../middlewares/protect"
import { getUsersForSidebar } from "../controllers/user";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;

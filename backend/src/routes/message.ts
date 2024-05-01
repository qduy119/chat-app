import express from "express";
import { getMessages, sendMessage } from "../controllers/message";
import protectRoute from "../middlewares/protect";
import { imagesUpload } from "../middlewares/imageUpload";

const router = express.Router();

router.use(protectRoute);

router.get("/:id", getMessages);
router.post("/send/:id", imagesUpload, sendMessage);

export default router;

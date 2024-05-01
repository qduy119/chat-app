import express from "express";
import protectRoute from "../middlewares/protect";
import { imageUpload, imagesUpload } from "../middlewares/imageUpload";
import {
    addMember,
    createGroup,
    getGroups,
    getMessagesInGroup,
    sendMessageInGroup,
} from "../controllers/group";

const router = express.Router();

router.use(protectRoute);

router.get("/", getGroups);
router.post("/", imageUpload, createGroup);
router.get("/:id", getMessagesInGroup);
router.post("/add-member/:id", addMember);
router.post("/send/:id", imagesUpload, sendMessageInGroup);

export default router;

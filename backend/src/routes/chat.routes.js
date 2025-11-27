import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import {
  createChatRoom,
  sendMessage,
  getUserRooms,
  getRoomMessages
} from "../controllers/chat.controller.js";

const router = Router();

// create a room (any type)
router.post("/create", authRequired, createChatRoom);

// send a message
router.post("/send", authRequired, sendMessage);

// get a list of user rooms
router.get("/rooms", authRequired, getUserRooms);

// receive room messages
router.get("/room/:roomId/messages", authRequired, getRoomMessages);

export default router;

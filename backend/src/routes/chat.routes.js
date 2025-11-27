import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import {
  createChatRoom,
  sendMessage,
  getUserRooms,
  getRoomMessages,
  editMessage,
  deleteMessage,
  pinMessage,
  unpinMessage,
  addReaction,
  removeReaction
} from "../controllers/chat.controller.js";

const router = Router();

// create a room
router.post("/create", authRequired, createChatRoom);

// send a message
router.post("/send", authRequired, sendMessage);

// list of user rooms
router.get("/rooms", authRequired, getUserRooms);

// room messages
router.get("/room/:roomId/messages", authRequired, getRoomMessages);

// edit message
router.patch("/message/:messageId", authRequired, editMessage);

// delete message
router.delete("/message/:messageId", authRequired, deleteMessage);

// pin / unpin
router.post("/message/:messageId/pin", authRequired, pinMessage);
router.post("/message/:messageId/unpin", authRequired, unpinMessage);

// reactions
router.post("/message/:messageId/reaction", authRequired, addReaction);
router.delete("/message/:messageId/reaction", authRequired, removeReaction);

export default router;

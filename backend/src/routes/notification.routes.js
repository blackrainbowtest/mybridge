import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import {
  getNotifications,
  markAsRead,
  markAllAsRead
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", authRequired, getNotifications);
router.post("/read/:id", authRequired, markAsRead);
router.post("/read-all", authRequired, markAllAsRead);

export default router;

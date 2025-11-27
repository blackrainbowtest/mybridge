import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import {
  getStudentProfile,
  updateStudentProfile,
  getOwnerProfile,
  updateOwnerProfile
} from "../controllers/profile.controller.js";

const router = Router();

// Students
router.get("/student/:id", authRequired, getStudentProfile);
router.patch("/student/:id", authRequired, updateStudentProfile);

// Owners
router.get("/owner/:id", authRequired, getOwnerProfile);
router.patch("/owner/:id", authRequired, updateOwnerProfile);

export default router;
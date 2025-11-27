import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import {
  applyToProject,
  listProjectApplications,
  updateApplicationStatus
} from "../controllers/application.controller.js";

const router = Router();

// STUDENT: apply
router.post("/apply/:projectId", authRequired, applyToProject);

// OWNER: list applications
router.get("/project/:projectId", authRequired, listProjectApplications);

// OWNER: update application status
router.patch("/:applicationId", authRequired, updateApplicationStatus);

export default router;

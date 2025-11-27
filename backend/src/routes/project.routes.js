import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject
} from "../controllers/project.controller.js";

const router = Router();

// LIST + FILTER
router.get("/", listProjects);

// GET ONE
router.get("/:id", getProject);

// CREATE (owner only)
router.post("/", authRequired, createProject);

// UPDATE (owner only)
router.patch("/:id", authRequired, updateProject);

// DELETE (owner only)
router.delete("/:id", authRequired, deleteProject);

export default router;

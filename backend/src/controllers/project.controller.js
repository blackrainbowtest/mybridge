import prisma from "../utils/prisma.js";
import { getPaginationParams, buildPaginationObject } from "../utils/pagination.js";

// ------------------------------
// CREATE PROJECT
// ------------------------------
export async function createProject(req, res) {
  try {
    const user = req.user;

    if (user.role !== "OWNER") {
      return res.status(403).json({ error: "Only owners can create projects" });
    }

    const { title, description, requiredSkills, difficulty, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        requiredSkills: requiredSkills || null,
        difficulty,
        category,
        ownerId: user.userId
      }
    });

    return res.json(project);

  } catch (e) {
    console.error("CREATE PROJECT ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------------------
// LIST PROJECTS (FILTERS)
// ------------------------------
export async function listProjects(req, res) {
  try {
    const { page, limit, skip } = getPaginationParams(req);
    const { category, difficulty, skills, openOnly } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (difficulty) filters.difficulty = difficulty;
    if (openOnly) filters.isOpen = true;
    if (skills) {
      filters.requiredSkills = { contains: skills };
    }

    const total = await prisma.project.count({ where: filters });

    const projects = await prisma.project.findMany({
      where: filters,
      include: {
        owner: {
          include: { ownerProfile: true }
        }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    });

    return res.json({
      data: projects,
      pagination: buildPaginationObject(page, limit, total)
    });

  } catch (e) {
    console.error("LIST PROJECTS ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------------------
// GET ONE PROJECT
// ------------------------------
export async function getProject(req, res) {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        owner: {
          include: {
            ownerProfile: true
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.json(project);

  } catch (e) {
    console.error("GET PROJECT ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------------------
// UPDATE PROJECT
// ------------------------------
export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const user = req.user;

    // проверяем владельца проекта
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return res.status(404).json({ error: "Not found" });

    if (project.ownerId !== user.userId) {
      return res.status(403).json({ error: "You do not own this project" });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: req.body
    });

    return res.json(updated);

  } catch (e) {
    console.error("UPDATE PROJECT ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------------------
// DELETE PROJECT
// ------------------------------
export async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const user = req.user;

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return res.status(404).json({ error: "Not found" });

    if (project.ownerId !== user.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await prisma.project.delete({ where: { id } });

    return res.json({ message: "Deleted successfully" });

  } catch (e) {
    console.error("DELETE PROJECT ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

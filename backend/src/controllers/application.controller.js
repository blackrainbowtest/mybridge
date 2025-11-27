import prisma from "../utils/prisma.js";
import { getPaginationParams, buildPaginationObject } from "../utils/pagination.js";

// ------------------------------
// STUDENT: APPLY
// ------------------------------
export async function applyToProject(req, res) {
  try {
    const user = req.user;

    if (user.role !== "STUDENT") {
      return res.status(403).json({ error: "Only students can apply" });
    }

    const { projectId } = req.params;
    const { coverLetter } = req.body;

    // We are checking the project
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (!project.isOpen) {
      return res.status(400).json({ error: "Project is closed" });
    }

    // We check whether the student has already submitted an application
    const exists = await prisma.application.findFirst({
      where: {
        projectId,
        studentId: user.userId
      }
    });

    if (exists) {
      return res.status(400).json({ error: "You already applied to this project" });
    }

    const application = await prisma.application.create({
      data: {
        projectId,
        studentId: user.userId,
        coverLetter: coverLetter || null
      }
    });

    return res.json({
      message: "Application submitted",
      application
    });

  } catch (e) {
    console.error("APPLY ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}


// ------------------------------
// OWNER: LIST APPLICATIONS
// ------------------------------
export async function listProjectApplications(req, res) {
  try {
    const user = req.user;
    const { projectId } = req.params;
    const { page, limit, skip } = getPaginationParams(req);

    if (user.role !== "OWNER") {
      return res.status(403).json({ error: "Only owners can view applications" });
    }

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (project.ownerId !== user.userId) {
      return res.status(403).json({ error: "This project is not yours" });
    }

    const total = await prisma.application.count({ where: { projectId } });

    const applications = await prisma.application.findMany({
      where: { projectId },
      include: {
        student: {
          include: { studentProfile: true }
        }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    });

    return res.json({
      data: applications,
      pagination: buildPaginationObject(page, limit, total)
    });

  } catch (e) {
    console.error("LIST APPLICATIONS ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}


// ------------------------------
// OWNER: UPDATE APPLICATION STATUS
// ------------------------------
export async function updateApplicationStatus(req, res) {
  try {
    const user = req.user;

    if (user.role !== "OWNER") {
      return res.status(403).json({ error: "Only owners can update status" });
    }

    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["PENDING", "ACCEPTED", "REJECTED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { project: true }
    });

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    if (application.project.ownerId !== user.userId) {
      return res.status(403).json({ error: "This application is not for your project" });
    }

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: { status }
    });

    return res.json(updated);

  } catch (e) {
    console.error("UPDATE APPLICATION ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

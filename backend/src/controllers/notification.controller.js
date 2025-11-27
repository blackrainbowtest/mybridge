import prisma from "../utils/prisma.js";
import { getPaginationParams, buildPaginationObject } from "../utils/pagination.js";

export async function getNotifications(req, res) {
  try {
    const { page, limit, skip } = getPaginationParams(req);

    const total = await prisma.notification.count({
      where: { userId: req.user.userId }
    });

    const items = await prisma.notification.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    });

    return res.json({
      data: items,
      pagination: buildPaginationObject(page, limit, total)
    });

  } catch (e) {
    console.error("GET NOTIFICATIONS ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function markAsRead(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const notif = await prisma.notification.findUnique({ where: { id } });

    if (!notif || notif.userId !== userId) {
      return res.status(404).json({ error: "Notification not found" });
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { isRead: true }
    });

    return res.json(updated);

  } catch (e) {
    console.error("MARK AS READ ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function markAllAsRead(req, res) {
  try {
    const userId = req.user.userId;

    await prisma.notification.updateMany({
      where: { userId },
      data: { isRead: true }
    });

    return res.json({ message: "All notifications marked as read" });

  } catch (e) {
    console.error("MARK ALL ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

import prisma from "../utils/prisma.js";

export async function notify(userId, type, message, payload = {}) {
  return prisma.notification.create({
    data: {
      userId,
      type,
      message,
      payload
    }
  });
}

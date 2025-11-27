import prisma from "../utils/prisma.js";

// ------------------------------
// CREATE ROOM
// ------------------------------
export async function createChatRoom(req, res) {
  try {
    const { type, projectId, applicationId, memberIds } = req.body;

    // Create room
    const room = await prisma.chatRoom.create({
      data: {
        type,
        projectId: projectId || null,
        applicationId: applicationId || null,
        members: {
          create: memberIds.map(id => ({ userId: id }))
        }
      }
    });

    return res.json({ room });

  } catch (e) {
    console.error("CREATE ROOM ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------------------
// SEND MESSAGE
// ------------------------------
export async function sendMessage(req, res) {
  try {
    const user = req.user;
    const { roomId, content } = req.body;

    const member = await prisma.chatMember.findFirst({
      where: { roomId, userId: user.userId }
    });

    if (!member)
      return res.status(403).json({ error: "You are not a member of this room" });

    const msg = await prisma.message.create({
      data: {
        roomId,
        senderId: user.userId,
        content
      }
    });

    return res.json(msg);

  } catch (e) {
    console.error("SEND MESSAGE ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------------------
// GET USER ROOMS
// ------------------------------
export async function getUserRooms(req, res) {
  try {
    const user = req.user;

    const rooms = await prisma.chatMember.findMany({
      where: { userId: user.userId },
      include: {
        room: {
          include: {
            members: {
              include: { user: true }
            }
          }
        }
      }
    });

    return res.json(rooms);

  } catch (e) {
    console.error("GET ROOMS ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------------------
// GET MESSAGES
// ------------------------------
export async function getRoomMessages(req, res) {
  try {
    const user = req.user;
    const { roomId } = req.params;

    const member = await prisma.chatMember.findFirst({
      where: { roomId, userId: user.userId }
    });

    if (!member)
      return res.status(403).json({ error: "You are not in this room" });

    const messages = await prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: "asc" },
      include: {
        sender: true
      }
    });

    return res.json(messages);

  } catch (e) {
    console.error("GET MESSAGES ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

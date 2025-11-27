import prisma from "../utils/prisma.js";
import { getPaginationParams, buildPaginationObject } from "../utils/pagination.js";

// ------------------------------
// CREATE ROOM
// ------------------------------
export async function createChatRoom(req, res) {
  try {
    const { type, projectId, applicationId, memberIds } = req.body;

    const room = await prisma.chatRoom.create({
      data: {
        type,
        projectId: projectId || null,
        applicationId: applicationId || null,
        members: {
          create: memberIds.map((id) => ({ userId: id }))
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
// SEND MESSAGE (text + attachment)
// ------------------------------
export async function sendMessage(req, res) {
  try {
    const user = req.user;
    const { roomId, content, attachmentUrl } = req.body;

    const member = await prisma.chatMember.findFirst({
      where: { roomId, userId: user.userId }
    });

    if (!member) {
      return res.status(403).json({ error: "You are not a member of this room" });
    }

    const msg = await prisma.message.create({
      data: {
        roomId,
        senderId: user.userId,
        content: content || null,
        attachmentUrl: attachmentUrl || null
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
// GET MESSAGES (with reactions)
// ------------------------------
export async function getRoomMessages(req, res) {
  try {
    const user = req.user;
    const { roomId } = req.params;
    const { page, limit, skip } = getPaginationParams(req);

    const member = await prisma.chatMember.findFirst({
      where: { roomId, userId: user.userId }
    });

    if (!member) {
      return res.status(403).json({ error: "You are not in this room" });
    }

    const total = await prisma.message.count({ where: { roomId } });

    const messages = await prisma.message.findMany({
      where: { roomId },
      include: {
        sender: true,
        reactions: {
          include: { user: true }
        }
      },
      orderBy: { createdAt: "desc" },  // newest first
      skip,
      take: limit
    });

    return res.json({
      data: messages,
      pagination: buildPaginationObject(page, limit, total)
    });

  } catch (e) {
    console.error("GET MESSAGES ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------------------
// EDIT MESSAGE
// ------------------------------
export async function editMessage(req, res) {
  try {
    const user = req.user;
    const { messageId } = req.params;
    const { content } = req.body;

    const message = await prisma.message.findUnique({
      where: { id: messageId }
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.senderId !== user.userId) {
      return res.status(403).json({ error: "You can edit only your messages" });
    }

    if (message.isDeleted) {
      return res.status(400).json({ error: "Cannot edit deleted message" });
    }

    const updated = await prisma.message.update({
      where: { id: messageId },
      data: {
        content: content
      }
      // updatedAt обновится автоматически
    });

    return res.json(updated);
  } catch (e) {
    console.error("EDIT MESSAGE ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------------------
// DELETE MESSAGE (soft delete)
// ------------------------------
export async function deleteMessage(req, res) {
  try {
    const user = req.user;
    const { messageId } = req.params;

    const message = await prisma.message.findUnique({
      where: { id: messageId }
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.senderId !== user.userId) {
      return res.status(403).json({ error: "You can delete only your messages" });
    }

    const updated = await prisma.message.update({
      where: { id: messageId },
      data: {
        isDeleted: true,
        content: null,
        attachmentUrl: null
      }
    });

    return res.json(updated);
  } catch (e) {
    console.error("DELETE MESSAGE ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------------------
// PIN / UNPIN MESSAGE
// ------------------------------
export async function pinMessage(req, res) {
  try {
    const user = req.user;
    const { messageId } = req.params;

    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: {
        room: {
          include: {
            members: true
          }
        }
      }
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    const isMember = message.room.members.some(m => m.userId === user.userId);
    if (!isMember) {
      return res.status(403).json({ error: "You are not in this room" });
    }

    const updated = await prisma.message.update({
      where: { id: messageId },
      data: {
        isPinned: true
      }
    });

    return res.json(updated);
  } catch (e) {
    console.error("PIN MESSAGE ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function unpinMessage(req, res) {
  try {
    const user = req.user;
    const { messageId } = req.params;

    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: {
        room: {
          include: { members: true }
        }
      }
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    const isMember = message.room.members.some(m => m.userId === user.userId);
    if (!isMember) {
      return res.status(403).json({ error: "You are not in this room" });
    }

    const updated = await prisma.message.update({
      where: { id: messageId },
      data: {
        isPinned: false
      }
    });

    return res.json(updated);
  } catch (e) {
    console.error("UNPIN MESSAGE ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------------------
// REACTIONS
// ------------------------------
export async function addReaction(req, res) {
  try {
    const user = req.user;
    const { messageId } = req.params;
    const { emoji } = req.body;

    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: {
        room: {
          include: { members: true }
        }
      }
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    const isMember = message.room.members.some(m => m.userId === user.userId);
    if (!isMember) {
      return res.status(403).json({ error: "You are not in this room" });
    }

    const reaction = await prisma.reaction.upsert({
      where: {
        messageId_userId_emoji: {
          messageId,
          userId: user.userId,
          emoji
        }
      },
      update: {},
      create: {
        messageId,
        userId: user.userId,
        emoji
      }
    });

    return res.json(reaction);
  } catch (e) {
    console.error("ADD REACTION ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function removeReaction(req, res) {
  try {
    const user = req.user;
    const { messageId } = req.params;
    const { emoji } = req.body;

    await prisma.reaction.delete({
      where: {
        messageId_userId_emoji: {
          messageId,
          userId: user.userId,
          emoji
        }
      }
    });

    return res.json({ message: "Reaction removed" });
  } catch (e) {
    console.error("REMOVE REACTION ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

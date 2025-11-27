import prisma from "../utils/prisma.js";

// --------------------------
// STUDENT: GET
// --------------------------

export async function getStudentProfile(req, res) {
  const { id } = req.params;

  try {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: id },
      include: { user: true }
    });

    if (!profile) return res.status(404).json({ error: "Student not found" });

    return res.json(profile);

  } catch (e) {
    console.error("GET STUDENT ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// --------------------------
// STUDENT: UPDATE
// --------------------------

export async function updateStudentProfile(req, res) {
  const { id } = req.params;

  // blocking someone else's profile from updating
  if (req.user.userId !== id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const updated = await prisma.studentProfile.update({
      where: { userId: id },
      data: req.body
    });

    return res.json(updated);

  } catch (e) {
    console.error("UPDATE STUDENT ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// --------------------------
// OWNER: GET
// --------------------------

export async function getOwnerProfile(req, res) {
  const { id } = req.params;

  try {
    const profile = await prisma.ownerProfile.findUnique({
      where: { userId: id },
      include: { user: true }
    });

    if (!profile) return res.status(404).json({ error: "Owner not found" });

    return res.json(profile);

  } catch (e) {
    console.error("GET OWNER ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// --------------------------
// OWNER: UPDATE
// --------------------------

export async function updateOwnerProfile(req, res) {
  const { id } = req.params;

  if (req.user.userId !== id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const updated = await prisma.ownerProfile.update({
      where: { userId: id },
      data: req.body
    });

    return res.json(updated);

  } catch (e) {
    console.error("UPDATE OWNER ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

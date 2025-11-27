import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

// -------------------------
// JWT generators
// -------------------------

function generateAccessToken(user) {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
}

// -------------------------
// REGISTER
// -------------------------

export async function register(req, res) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role
      }
    });

    // create profile (empty)
    if (role === "STUDENT") {
      await prisma.studentProfile.create({ data: { userId: user.id } });
    } else {
      await prisma.ownerProfile.create({ data: { userId: user.id } });
    }

    return res.json({ message: "Registered", userId: user.id });

  } catch (e) {
    console.error("REGISTER ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// -------------------------
// LOGIN
// -------------------------

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    // token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // save refresh-token in DB
    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    return res.json({
      message: "Logged in",
      accessToken,
      refreshToken
    });

  } catch (e) {
    console.error("LOGIN ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// -------------------------
// REFRESH
// -------------------------

export async function refreshToken(req, res) {
  try {
    const { token } = req.body;

    if (!token) return res.status(400).json({ error: "Missing token" });

    // tokem must contains in DB
    const found = await prisma.refreshToken.findUnique({ where: { token } });
    if (!found) return res.status(401).json({ error: "Invalid refresh token" });

    // check JWT sign
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        // delete if outdated or broken
        await prisma.refreshToken.delete({ where: { token } });
        return res.status(401).json({ error: "Expired refresh token" });
      }

      const user = await prisma.user.findUnique({ where: { id: payload.userId } });

      // generate new access
      const newAccessToken = generateAccessToken(user);

      return res.json({
        accessToken: newAccessToken
      });
    });

  } catch (e) {
    console.error("REFRESH ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

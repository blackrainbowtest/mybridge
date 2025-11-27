import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// get way /uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Statistics
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

export default app;

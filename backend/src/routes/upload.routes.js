import { Router } from "express";
import upload from "../middleware/upload.js";

const router = Router();

router.post("/avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File not found" });
  }

  const fileUrl = "/uploads/" + req.file.filename;

  res.json({
    message: "Avatar uploaded",
    url: fileUrl
  });
});

router.post("/logo", upload.single("logo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File not found" });
  }

  const fileUrl = "/uploads/" + req.file.filename;

  res.json({
    message: "Company logo uploaded",
    url: fileUrl
  });
});

export default router;

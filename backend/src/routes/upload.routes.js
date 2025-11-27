import { Router } from "express";
import { uploader } from "../middleware/upload.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

// Upload avatar
router.post(
  "/avatar",
  authRequired,
  uploader("avatar").single("avatar"),
  (req, res) => {
    const fileUrl = req.file.path.replace(/.*uploads/, "/uploads");
    res.json({ url: fileUrl });
  }
);

// Upload logo
router.post(
  "/logo",
  authRequired,
  uploader("logo").single("logo"),
  (req, res) => {
    const fileUrl = req.file.path.replace(/.*uploads/, "/uploads");
    res.json({ url: fileUrl });
  }
);

// Chat attachments
router.post(
  "/chat",
  authRequired,
  uploader("chat").single("file"),
  (req, res) => {
    const fileUrl = req.file.path.replace(/.*uploads/, "/uploads");
    res.json({ url: fileUrl });
  }
);

// Project images
router.post(
  "/project",
  authRequired,
  uploader("project").single("image"),
  (req, res) => {
    const fileUrl = req.file.path.replace(/.*uploads/, "/uploads");
    res.json({ url: fileUrl });
  }
);

// Resume upload
router.post(
  "/resume",
  authRequired,
  uploader("resume").single("file"),
  (req, res) => {
    const fileUrl = req.file.path.replace(/.*uploads/, "/uploads");
    res.json({ url: fileUrl });
  }
);

export default router;

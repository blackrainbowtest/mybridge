import { Router } from "express";

const router = Router();

// TODO: register / login / refresh
router.get("/test", (req, res) => {
  res.json({ ok: true });
});

export default router;
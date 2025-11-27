import jwt from "jsonwebtoken";

// router.get("/students/:id", authRequired, ...)
// Now any protected API can be marked
export function authRequired(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "No authorization header" });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.user = payload; // userId + role
    next();
  });
}

import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Available Categories
const allowedFolders = ["avatar", "logo", "chat", "project", "resume"];

// check MIME
const allowedMime = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/gif": ".gif",
  "application/pdf": ".pdf"
};

function ensureFolder(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
}

function createStorage(folderName) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      if (!allowedFolders.includes(folderName)) {
        return cb(new Error("Invalid upload folder"));
      }

      const dateFolder = new Date()
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "/");

      const targetPath = path.join(__dirname, "../uploads", folderName, dateFolder);
      ensureFolder(targetPath);

      cb(null, targetPath);
    },
    filename: function (req, file, cb) {
      const ext = allowedMime[file.mimetype];
      if (!ext) return cb(new Error("Invalid file type"));

      const uniqueName = Date.now() + "_" + Math.round(Math.random() * 1e9) + ext;
      cb(null, uniqueName);
    }
  });
}

// limits
const limits = {
  fileSize: 10 * 1024 * 1024 // 10 MB
};

export function uploader(folder) {
  return multer({
    storage: createStorage(folder),
    limits,
    fileFilter(req, file, cb) {
      if (!allowedMime[file.mimetype]) {
        return cb(new Error("Unsupported file type"));
      }
      cb(null, true);
    }
  });
}

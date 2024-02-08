import multer from "multer";
import { entryDir } from "..";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(entryDir, "..") + "/uploads");
  },
  filename: (req, file, cb) => {
    const prefix = Date.now() + Math.random() * 1e6;
    cb(null, prefix + "-" + file.originalname);
  },
});

export default storage;

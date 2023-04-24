import multer, { MulterError } from "multer";

export default multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 * 1024 },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileFilter: (req, file, cb: any) => {
    if (file.mimetype.includes("image") || file.mimetype.includes("video")) {
      cb(null, true);
    } else {
      cb(new MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
  },
});

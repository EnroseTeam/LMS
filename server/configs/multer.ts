import multer from 'multer';

export default multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image') || file.mimetype.includes('video')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

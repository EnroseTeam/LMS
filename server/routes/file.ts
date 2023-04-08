import express from 'express';
import uploader from '../configs/multer';
import { uploadFile } from '../controllers/file';

const fileRouter = express.Router();

fileRouter.use(uploader.single('file'));

fileRouter.post('/upload', uploadFile);

export default fileRouter;

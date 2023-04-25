import express from "express";
import uploader from "../configs/multer";
import { uploadImage, uploadSvg, uploadVideo } from "../controllers/file";

const fileRouter = express.Router();

fileRouter.use(uploader.single("file"));

fileRouter.post("/videos", uploadVideo);
fileRouter.post("/images", uploadImage);
fileRouter.post("/svg", uploadSvg);

export default fileRouter;

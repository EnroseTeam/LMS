import { RequestHandler } from 'express';
import cloudinary from '../configs/cloudinary';

export const uploadFile: RequestHandler = async (req, res, next) => {
  try {
    const file = req.file as Express.Multer.File;
    const upload = await cloudinary.uploader.upload(file.path);
    res.status(201).json({ message: 'Амжилттай', body: upload.secure_url });
  } catch (error) {
    next(error);
  }
};

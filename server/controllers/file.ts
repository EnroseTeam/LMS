import { RequestHandler } from "express";
import {
  s3UploadImage,
  s3UploadSvg,
  s3UploadVideo,
} from "../services/s3Service";
import createHttpError from "http-errors";

export const uploadImage: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) throw createHttpError(400, "Файл байхгүй байна!");
    const file: Express.Multer.File = req.file;

    if (file.mimetype.includes("video") || file.mimetype.includes("svg+xml"))
      throw createHttpError(
        400,
        "Файлын өргөтгөл буруу байна. Зөвхөн зурган файл хуулах боломжтой."
      );

    const result = await s3UploadImage(file);
    res
      .status(201)
      .json({ message: "Зураг амжилттай хуулагдлаа.", body: result.Location });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const uploadVideo: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) throw createHttpError(400, "Файл байхгүй байна!");
    const file: Express.Multer.File = req.file;

    if (!file.mimetype.includes("video"))
      throw createHttpError(
        400,
        "Файлын өргөтгөл буруу байна. Зөвхөн видео файл хуулах боломжтой."
      );

    const result = await s3UploadVideo(file);
    res
      .status(201)
      .json({ message: "Бичлэг амжилттай хуулагдлаа.", body: result.Location });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const uploadSvg: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) throw createHttpError(400, "Файл байхгүй байна!");
    const file: Express.Multer.File = req.file;

    if (!file.mimetype.includes("svg+xml"))
      throw createHttpError(
        400,
        "Файлын өргөтгөл буруу байна. Зөвхөн SVG файл хуулах боломжтой."
      );

    const result = await s3UploadSvg(file);
    res
      .status(201)
      .json({
        message: "SVG файл амжилттай хуулагдлаа.",
        body: result.Location,
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

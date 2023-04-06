import CourseLessonModel from '../models/courseLesson';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { RequestHandler } from 'express';

interface CourseLessonBody {
  name?: string;
  description?: string;
  video?: string;
  length?: string;
  type?: string;
}

interface CourseLessonParams {
  id: string;
}

export const getCourseLessons: RequestHandler = async (req, res, next) => {
  try {
    const courseLessons = await CourseLessonModel.find();
    res.status(200).json({ message: 'Амжилттай', body: courseLessons });
  } catch (error) {
    next(error);
  }
};

export const getSingleCourseLesson: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Id буруу байна.');

    const courseLesson = await CourseLessonModel.findById(id);
    if (!courseLesson) throw createHttpError(404, 'Хичээл олдсонгүй');

    res.status(200).json({ message: 'Амжилттай', body: courseLesson });
  } catch (error) {
    next(error);
  }
};

export const createCourseLesson: RequestHandler<
  unknown,
  unknown,
  CourseLessonBody,
  unknown
> = async (req, res, next) => {
  const { name, description, video, length, type } = req.body;

  try {
    if (!name) throw createHttpError(400, 'Гарчиг заавал шаардлагатай.');
    if (!length) throw createHttpError(400, 'Хичээлийн хугацаа заавал шаардлагатай.');
    if (!type) throw createHttpError(400, 'Хичээлийн төрөл заавал шаардлагатай.');

    const newCourseLesson = await CourseLessonModel.create({
      name,
      description,
      video,
      length,
      type,
    });

    res
      .status(201)
      .json({ message: `${name} нэртэй хичээл амжилттай нэмэгдлээ.`, body: newCourseLesson });
  } catch (error) {
    next(error);
  }
};

export const updateCourseLesson: RequestHandler<
  CourseLessonParams,
  unknown,
  CourseLessonBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, video, length, type } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Id буруу байна');

    if (!name) throw createHttpError(400, 'Гарчиг заавал шаардлагатай.');
    if (!length) throw createHttpError(400, 'Хичээлийн хугацаа заавал шаардлагатай.');
    if (!type) throw createHttpError(400, 'Хичээлийн төрөл заавал шаардлагатай.');

    const courseLesson = await CourseLessonModel.findById(id);
    if (!courseLesson) throw createHttpError(404, 'Хичээл олдсонгүй.');

    courseLesson.name = name;
    courseLesson.description = description;
    courseLesson.video = video;
    courseLesson.length = length;
    courseLesson.type = type;

    const editedCourseLesson = await courseLesson.save();
    res.status(200).json({
      message: `${name} нэртэй хичээлийн мэдээлэл амжилттай шинэчлэгдлээ.`,
      body: editedCourseLesson,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourseLesson: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Id буруу байна.');

    const courseLesson = await CourseLessonModel.findById(id);
    if (!courseLesson) throw createHttpError(404, 'Хичээл олдсонгүй.');

    await courseLesson.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

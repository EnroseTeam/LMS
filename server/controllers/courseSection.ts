import CourseSectionModel from '../models/courseSection';
import CourseModel from '../models/course';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { RequestHandler } from 'express';

export const getCourseSections: RequestHandler = async (req, res, next) => {
  const { courseId } = req.query;

  try {
    if (!courseId) throw createHttpError(400, 'Сургалтын id заавал шаардлагатай.');
    if (!mongoose.isValidObjectId(courseId))
      throw createHttpError(400, 'Сургалтын id буруу байна.');

    const isCourseExist = await CourseModel.findById(courseId);
    if (!isCourseExist) throw createHttpError(404, 'Харгалзах сургалт олдсонгүй.');

    const courseSections = await CourseSectionModel.find({ course: courseId });

    res.status(200).json({ message: 'Амжилттай', body: courseSections });
  } catch (error) {
    next(error);
  }
};

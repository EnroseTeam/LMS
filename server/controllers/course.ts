import { RequestHandler } from 'express';
import CourseModel from '../models/course';
import CourseCategoryModel from '../models/courseCategory';
import CourseLevelModel from '../models/courseLevel';
import createHttpError from 'http-errors';

export const getCourses: RequestHandler = async (req, res, next) => {
  try {
    const courses = await CourseModel.find().populate([
      'instructor',
      'level',
      'category',
      'reviews',
      'sections',
    ]);

    res.status(200).json({ message: 'Амжилттай', body: courses });
  } catch (error) {
    next(error);
  }
};

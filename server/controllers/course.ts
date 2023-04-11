import { RequestHandler } from 'express';
import CourseModel from '../models/course';
import CourseCategoryModel from '../models/courseCategory';
import CourseLevelModel from '../models/courseLevel';
import UserModel from '../models/user';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const getCourses: RequestHandler = async (req, res, next) => {
  try {
    const courses = await CourseModel.find().populate([
      'instructor',
      'level',
      'category',
      'reviews',
      'sections.lessons',
    ]);

    res.status(200).json({ message: 'Амжилттай', body: courses });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSingleCourse: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Id буруу байна');

    const course = await CourseModel.findById(id).populate([
      'instructor',
      'level',
      'category',
      'reviews',
      'sections',
    ]);
    if (!course) throw createHttpError(404, 'Цуврал хичээл олдсонгүй');

    res.status(200).json({ message: 'Амжилттай', body: course });
  } catch (error) {
    next(error);
  }
};

interface CourseBody {
  name?: string;
  description?: string;
  picture?: string;
  instructor?: string;
  level?: string;
  category?: string;
  requirements?: string[];
  goals?: string[];
  sections?: string[];
}

export const createCourse: RequestHandler<unknown, unknown, CourseBody, unknown> = async (
  req,
  res,
  next
) => {
  const { name, description, picture, instructor, level, category, requirements, goals, sections } =
    req.body;

  const session = await mongoose.startSession();

  try {
    if (!name) throw createHttpError(400, 'Гарчиг заавал шаардлагатай');
    if (!picture) throw createHttpError(400, 'Зураг заавал шаардлагатай');
    if (!instructor) throw createHttpError(400, 'Багшийн мэдээлэл заавал шаардлагатай');
    if (!level) throw createHttpError(400, 'Хичээлийн түвшин заавал шаардлагатай');
    if (!category) throw createHttpError(400, 'Хичээлийн ангилал заавал шаардлагатай');
    if (!requirements)
      throw createHttpError(400, 'Хичээлд шаардагдах чадварууд заавал шаардлагатай');
    if (!goals) throw createHttpError(400, 'Хичээлийн зорилго заавал шаардлагатай');

    session.startTransaction();

    const isInstructorExist = await UserModel.findById(instructor, null, { session });
    if (!isInstructorExist) throw createHttpError(404, 'Багш олдсонгүй');

    const isLevelExist = await CourseLevelModel.findById(level, null, { session });
    if (!isLevelExist) throw createHttpError(404, 'Хичээлийн түвшин олдсонгүй');

    const isCategoryExist = await CourseCategoryModel.findById(category, null, { session });
    if (!isCategoryExist) throw createHttpError(404, 'Хичээлийн ангилал олдсонгүй');

    await CourseModel.create(
      [
        {
          name,
          description,
          picture,
          instructor,
          level,
          category,
          requirements,
          goals,
          sections,
        },
      ],
      { session }
    );

    isCategoryExist.courseCount += 1;
    await isCategoryExist.save({ session });

    await session.commitTransaction();

    res.status(201).json({ message: `${name} нэртэй цуврал хичээл амжилттай нэмэгдлээ` });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

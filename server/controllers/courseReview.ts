import CourseReviewModel from '../models/courseReview';
import CourseModel from '../models/course';
import UserModel from '../models/user';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { RequestHandler } from 'express';

interface CourseReviewBody {
  title?: string;
  text?: string;
  user?: string;
  rating?: number;
  course?: string;
}

interface CourseReviewParams {
  id: string;
}

//GET ALL REVIEWS
export const getCourseReviews: RequestHandler = async (req, res, next) => {
  try {
    const reviews = await CourseReviewModel.find().populate('user');

    res.status(200).json({ message: 'Амжилттай', body: reviews });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE REVIEW BY ID
export const getSingleCourseReview: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Id буруу байна.');

    const review = await CourseReviewModel.findById(id).populate('user');
    if (!review) throw createHttpError(404, 'Сэтгэгдэл олдсонгүй.');

    res.status(200).json({ message: 'Амжилттай', body: review });
  } catch (error) {
    next(error);
  }
};

//CREATE A REVIEW
export const createCourseReview: RequestHandler<
  unknown,
  unknown,
  CourseReviewBody,
  unknown
> = async (req, res, next) => {
  const { title, text, user, rating, course } = req.body;

  const session = await mongoose.startSession();

  try {
    if (!title) throw createHttpError(400, 'Гарчиг заавал шаардлагатай.');
    if (!user) throw createHttpError(400, 'Хэрэглэгчийн Id заавал шаардлагатай.');
    if (!rating) throw createHttpError(400, 'Үнэлгээ заавал шаардлагатай.');
    if (!course) throw createHttpError(400, 'Сургалтын id заавал шаардлагатай.');
    if (!mongoose.isValidObjectId(user)) throw createHttpError(400, 'Хэрэглэгчийн id буруу байна.');
    if (!mongoose.isValidObjectId(course)) throw createHttpError(400, 'Сургалтын id буруу байна.');

    session.startTransaction();

    const isUserExist = await UserModel.findById(user, null, { session });
    if (!isUserExist) throw createHttpError(400, `${user} id-тай хэрэглэгч олдсонгүй.`);

    const isCourseExist = await CourseModel.findById(course, null, { session });
    if (!isCourseExist) throw createHttpError(400, `${course} id-тай сургалт олдсонгүй.`);

    const [newReview] = await CourseReviewModel.create(
      [
        {
          title,
          text,
          user,
          rating,
        },
      ],
      { session }
    );

    isCourseExist.reviews.push(newReview._id);
    await isCourseExist.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: 'Амжилттай нэмэгдлээ.', body: newReview });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

//DELETE A REVIEW
export const deleteCourseReview: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const session = await mongoose.startSession();

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Id буруу байна.');

    session.startTransaction();

    const review = await CourseReviewModel.findById(id, null, { session });
    if (!review) throw createHttpError(404, 'Сэтгэгдэл олдсонгүй.');

    const reviewCourse = await CourseModel.findOne({
      reviews: { $elemMatch: { $eq: review._id } },
    });
    reviewCourse?.reviews.filter((curReview) => curReview._id !== review._id);
    await reviewCourse?.save({ session });

    await review.deleteOne({ session });

    await session.commitTransaction();

    res.sendStatus(204);
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

//UPDATE A REVIEW
export const updateCourseReview: RequestHandler<
  CourseReviewParams,
  unknown,
  CourseReviewBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { title, text, rating } = req.body;
  try {
    if (!title) throw createHttpError(400, 'Гарчиг заавал шаардлагатай.');
    if (!rating) throw createHttpError(400, 'Үнэлгээ заавал шаардлагатай.');

    const review = await CourseReviewModel.findById(id);
    if (!review) throw createHttpError(404, 'Сэтгэгдэл олдсонгүй.');

    await review.updateOne({
      title,
      text,
      rating,
    });

    res.status(200).json({ message: 'Амжилттай шинэчлээ' });
  } catch (error) {
    next(error);
  }
};

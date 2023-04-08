import CourseReviewModel from "../models/courseReview";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { RequestHandler } from "express";

interface CourseReviewBody {
  text?: string;
  user?: string;
  rating?: number;
}

interface CourseReviewParams {
  id: string;
}

//GET ALL REVIEWS
export const getCourseReviews: RequestHandler = async (req, res, next) => {
  try {
    const reviews = await CourseReviewModel.find().populate("user");

    res.status(200).json({ message: "Амжилттай", body: reviews });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE REVIEW BY ID
export const getSingleCourseReview: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Id буруу байна.");

    const review = await CourseReviewModel.findById(id).populate("user");
    if (!review) throw createHttpError(404, "Сэтгэгдэл олдсонгүй.");

    res.status(200).json({ message: "Амжилттай", body: review });
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
  const { text, user, rating } = req.body;

  try {
    if (!user)
      throw createHttpError(400, "Хэрэглэгчийн Id заавал шаардлагатай.");

    if (!rating) throw createHttpError(400, "Үнэлгээ заавал шаардлагатай.");

    if (!mongoose.isValidObjectId(user))
      throw createHttpError(400, "Id буруу байна.");

    const isUserExist = await UserModel.findById(user);
    if (!isUserExist)
      throw createHttpError(400, `${user} id-тай хэрэглэгч олдсонгүй.`);

    const newReview = await CourseReviewModel.create({
      text,
      user,
      rating,
    });

    res.status(200).json({ message: "Амжилттай нэмэгдлээ.", body: newReview });
  } catch (error) {
    next(error);
  }
};

//DELETE A REVIEW
export const deleteCourseReview: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Id буруу байна.");

    const review = await CourseReviewModel.findById(id);

    if (!review) throw createHttpError(404, "Сэтгэгдэл олдсонгүй.");

    await review.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

//UPDATE A REVIEW
export const updateCourseReview: RequestHandler<
  CourseReviewParams,
  unknown,
  CourseReviewBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { user, text, rating } = req.body;
  try {
    if (!user)
      throw createHttpError(400, "Хэрэглэгчийн Id заавал шаардлагатай.");

    if (!rating) throw createHttpError(400, "Үнэлгээ заавал шаардлагатай.");

    if (!mongoose.isValidObjectId(user))
      throw createHttpError(400, "Id буруу байна.");

    const isUserExist = await UserModel.findById(user);

    if (!isUserExist)
      throw createHttpError(400, `${user} id-тай хэрэглэгч олдсонгүй.`);

    const review = await CourseReviewModel.findById(id);

    if (!review) throw createHttpError(404, "Сэтгэгдэл олдсонгүй.");

    await review.updateOne({
      text,
      user,
      rating,
    });

    res.status(200).json({ message: "Амжилттай шинэчлээ" });
  } catch (error) {
    next(error);
  }
};

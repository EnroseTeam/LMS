import { RequestHandler } from "express";
import CourseReviewAnswerModel from "../models/courseReviewAnswer";
import CourseReviewModel from "../models/courseReview";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import assertIsDefined from "../utils/assertIsDefined";

export const getSingleCourseReviewAnswer: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    const reviewAnswer = await CourseReviewAnswerModel.findById(id);
    if (!reviewAnswer) throw createHttpError(404, "Сэтгэгдлийн хариу олдсонгүй.");

    res.status(200).json({ message: "Амжилттай", body: reviewAnswer });
  } catch (error) {
    next(error);
  }
};

interface CourseReviewAnswerBody {
  text?: string;
  review?: string;
}

export const createCourseReviewAnswer: RequestHandler<
  unknown,
  unknown,
  CourseReviewAnswerBody,
  unknown
> = async (req, res, next) => {
  const { text, review } = req.body;
  const instructorId = req.session.userId;

  const session = await mongoose.startSession();

  try {
    assertIsDefined(instructorId);

    if (!text) throw createHttpError(400, "Текст заавал шаардлагатай.");
    if (!review) throw createHttpError(400, "Сэтгэгдлийн id заавал шаардлагатай.");

    session.startTransaction();

    const isReviewExist = await CourseReviewModel.findById(review, null, { session });
    if (!isReviewExist) throw createHttpError(404, "Хариулах гэсэн сэтгэгдэл олдсонгүй.");

    const [newReviewAnswer] = await CourseReviewAnswerModel.create(
      [
        {
          text,
          review,
          instructor: instructorId,
        },
      ],
      { session }
    );

    isReviewExist.answer.push(newReviewAnswer._id);
    await isReviewExist.save({ session });

    res
      .status(201)
      .json({ message: "Сэтгэгдэлд хариулт амжилттай нэмэгдлээ.", body: newReviewAnswer });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

interface CourseReviewAnswerParams {
  id?: string;
}

export const updateCourseReviewAnswer: RequestHandler<
  CourseReviewAnswerParams,
  unknown,
  CourseReviewAnswerBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  const instructorId = req.session.userId;

  try {
    assertIsDefined(instructorId);

    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");
    if (!text) throw createHttpError(400, "Текст заавал шаардлагатай.");

    const reviewAnswer = await CourseReviewAnswerModel.findById(id);
    if (!reviewAnswer) throw createHttpError(404, "Сэтгэгдлийн хариу олдсонгүй.");

    if (reviewAnswer.instructor?.toString() !== instructorId.toString()) {
      throw createHttpError(403, "Танд энэ сэтгэгдлийн хариуг өөрчлөх эрх байхгүй байна.");
    }

    reviewAnswer.text = text;
    const updatedReviewAnswer = await reviewAnswer.save();

    res.status(200).json({
      message: "Сэтгэгдлийн хариу амжилттай шинэчлэгдлээ",
      body: updatedReviewAnswer,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourseReviewAnswer: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const instructorId = req.session.userId;

  try {
    assertIsDefined(instructorId);

    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    const reviewAnswer = await CourseReviewAnswerModel.findById(id);
    if (!reviewAnswer) throw createHttpError(404, "Сэтгэгдлийн хариу олдсонгүй.");

    if (reviewAnswer.instructor?.toString() !== instructorId.toString()) {
      throw createHttpError(403, "Танд энэ сургалтын хариуг устгах эрх байхгүй байна.");
    }

    await reviewAnswer.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

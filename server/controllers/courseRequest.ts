import { RequestHandler } from "express";
import CourseRequestModel from "../models/courseRequest";
import CourseModel from "../models/course";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import assertIsDefined from "../utils/assertIsDefined";

export const getAllCourseRequests: RequestHandler = async (req, res, next) => {
  try {
    const courseRequests = await CourseRequestModel.find()
      .populate(["course", "instructor"])
      .sort("-createdAt");

    res.status(200).json({ message: "Амжилттай", body: courseRequests });
  } catch (error) {
    next(error);
  }
};

export const getSingleCourseRequest: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    const courseRequest = await CourseRequestModel.findById(id);
    if (!courseRequest) throw createHttpError(404, "Хүсэлт олдсонгүй.");

    res.status(200).json({ message: "Амжилттай", body: courseRequest });
  } catch (error) {
    next(error);
  }
};

interface CourseRequestBody {
  course?: string;
  status?: "Accepted" | "Rejected";
}

export const createCourseRequest: RequestHandler<
  unknown,
  unknown,
  CourseRequestBody,
  unknown
> = async (req, res, next) => {
  const { course } = req.body;
  const instructorId = req.session.userId;

  try {
    assertIsDefined(instructorId);

    if (!course) throw createHttpError(400, "Сургалт заавал шаардлагатай.");

    const isRequestWithCourseExist = await CourseRequestModel.findOne({ course });
    if (isRequestWithCourseExist)
      throw createHttpError(
        400,
        "Та аль хэдийн энэ сургалтыг нийтлэх хүсэлт явуулсан байна. Та түр хүлээнэ үү."
      );

    const isCourseExist = await CourseModel.findById(course);
    if (!isCourseExist) throw createHttpError(404, "Сургалт олдсонгүй.");

    const newCourseRequest = await CourseRequestModel.create({
      course,
      instructor: instructorId,
    });

    res.status(201).json({
      message: "Хүсэлт амжилттай илгээгдлээ. Таны хүсэлтийг шалгаад, удахгүй хариу илгээх болно.",
      body: newCourseRequest,
    });
  } catch (error) {
    next(error);
  }
};

interface CourseRequestParams {
  id?: string;
}

export const updateCourseRequest: RequestHandler<
  CourseRequestParams,
  unknown,
  CourseRequestBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const session = await mongoose.startSession();

  try {
    if (!status) throw createHttpError(400, "Төлөв заавал шаардлагатай.");
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    session.startTransaction();

    const isCourseReqExist = await CourseRequestModel.findById(id, null, { session });
    if (!isCourseReqExist) throw createHttpError(404, "Хүсэлт олдсонгүй.");

    isCourseReqExist.status = status;
    await isCourseReqExist.save({ session });

    if (status === "Accepted") {
      const course = await CourseModel.findById(isCourseReqExist.course, null, { session });
      if (course) {
        course.isPublished = true;
        await course.save({ session });
      }
    }

    await session.commitTransaction();

    res.status(200).json({ message: "Хүсэлтийн төлөв амжилттай шинэчлэгдлээ." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

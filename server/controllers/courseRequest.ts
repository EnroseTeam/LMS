import { RequestHandler } from "express";
import CourseRequestModel from "../models/courseRequest";
import CourseModel from "../models/course";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import assertIsDefined from "../utils/assertIsDefined";
import axios from "axios";
import env from "../configs/validateEnv";
import UserModel from "../models/user";
import CourseCategoryModel from "../models/courseCategory";
import CourseLevelModel from "../models/courseLevel";

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

    const courseRequest = await CourseRequestModel.findById(id).populate([
      { path: "course", populate: { path: "sections", populate: ["lessons"] } },
      "instructor",
    ]);
    if (!courseRequest) throw createHttpError(404, "Хүсэлт олдсонгүй.");

    res.status(200).json({ message: "Амжилттай", body: courseRequest });
  } catch (error) {
    next(error);
  }
};

interface CourseRequestBody {
  course?: string;
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

    const isRequestWithCourseExist = await CourseRequestModel.findOne({
      course,
      status: { $in: ["Accepted", "Pending"] },
    });
    if (isRequestWithCourseExist)
      throw createHttpError(
        400,
        "Та аль хэдийн энэ сургалтыг нийтлэх хүсэлт явуулсан байна. Та түр хүлээнэ үү."
      );

    const isCourseExist = await CourseModel.findById(course);
    if (!isCourseExist) throw createHttpError(404, "Сургалт олдсонгүй.");

    if (isCourseExist.isPublished)
      throw createHttpError(400, "Энэ сургалт аль хэдийн нийтлэгдсэн байна.");

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

export const acceptCourseRequest: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const session = await mongoose.startSession();

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    session.startTransaction();

    const courseReq = await CourseRequestModel.findById(id, null, { session });
    if (!courseReq) throw createHttpError(404, "Хүсэлт олдсонгүй.");

    if (courseReq.status === "Accepted")
      throw createHttpError(400, "Энэ сургалт аль хэдийн нийтлэгдсэн байна.");

    const course = await CourseModel.findById(courseReq.course, null, { session });
    if (!course) throw createHttpError(404, "Хүсэлтийн сургалт олдсонгүй.");

    const instructor = await UserModel.findById(courseReq.instructor, null, { session }).select(
      "+ownPublishedCourses"
    );
    if (!instructor) throw createHttpError(404, "Сургалт багшгүй байна.");

    const category = await CourseCategoryModel.findById(course.category, null, { session });
    if (!category) throw createHttpError(404, "Сургалт ангилалгүй байна.");

    const level = await CourseLevelModel.findById(course.level, null, { session });
    if (!level) throw createHttpError(404, "Сургалт түвшингүй байна.");

    courseReq.status = "Accepted";
    await courseReq.save({ session });

    course.isPublished = true;
    await course.save({ session });

    instructor.ownPublishedCourses.push(course._id);
    await instructor.save({ session });

    category.courseCount += 1;
    await category.save({ session });

    level.courseCount += 1;
    await level.save({ session });

    await session.commitTransaction();

    await axios.all([
      axios.get(`${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/`),
      axios.get(
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/courses/${course._id}`
      ),
      axios.get(
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/dashboard/my-courses/${course._id}`
      ),
      axios.get(
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/${instructor._id}`
      ),
      axios.get(
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/about-us`
      ),
      axios.get(
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/become-instructor`
      ),
    ]);

    res.status(200).json({ message: "Хүсэлт амжилттай зөвшөөрөгдлөө." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

export const rejectCourseRequest: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    const courseReq = await CourseRequestModel.findById(id);
    if (!courseReq) throw createHttpError(404, "Хүсэлт олдсонгүй.");

    courseReq.status = "Rejected";
    await courseReq.save();

    res.status(200).json({ message: "Хүсэлтийг амжилттай цуцаллаа." });
  } catch (error) {
    next(error);
  }
};

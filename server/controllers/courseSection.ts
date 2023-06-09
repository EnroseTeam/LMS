import CourseSectionModel from "../models/courseSection";
import CourseModel, { ICourse } from "../models/course";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { RequestHandler } from "express";
import assertIsDefined from "../utils/assertIsDefined";
import axios from "axios";
import env from "../configs/validateEnv";

export const getCourseSetions: RequestHandler = async (req, res, next) => {
  try {
    // Байгаа бүх сэдвээ буцаана. Буцаахдаа lessons хэсгийг populate хийж буцаана.
    const courseSections = await CourseSectionModel.find().populate("lessons");
    res.status(200).json({ message: "Амжилттай", body: courseSections });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSingleCourseSection: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Хүсэлтээс ирсэн id зөв эсэхийг шалгах
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    // Орж ирсэн id-тай сургалтын сэдийг олох. Олдоогүй бол алдаа буцаах. Олохдоо lessons хэсгийг populate хийж цуг буцаана
    const courseSection = await CourseSectionModel.findById(id).populate("lessons");
    if (!courseSection) throw createHttpError(404, "Сургалтын сэдэв олдсонгүй.");

    res.status(200).json({ message: "Амжилттай", body: courseSection });
  } catch (error) {
    next(error);
  }
};

interface CourseSectionBody {
  title?: string;
  course?: string;
}

export const createCourseSection: RequestHandler<
  unknown,
  unknown,
  CourseSectionBody,
  unknown
> = async (req, res, next) => {
  const { title, course } = req.body;

  const session = await mongoose.startSession();

  try {
    // Хүсэлтээс ирж буй мэдээлэл бүрэн эсэхийг шалгах
    if (!title) throw createHttpError(400, "Гарчиг заавал шаардлагатай.");
    if (!course) throw createHttpError(400, "Сургалтын id заавал шаардалагатай.");

    session.startTransaction();

    // Орж ирсэн id-тай(course) сургалт байгаа эсэхийг шалгах. Байвал үргэлжлүүлэх
    const isCourseExist = await CourseModel.findById(course, null, { session });
    if (!isCourseExist) throw createHttpError(404, "Хамаарах сургалт олдсонгүй.");

    // Шинэ сэдэв үүсгэх
    const [newCourseSection] = await CourseSectionModel.create(
      [
        {
          title,
          course,
        },
      ],
      { session }
    );

    // Үүссэн сэдвийн id-г хүсэлтээс ирсэн сургалтруу нэмэх
    isCourseExist.sections.push(newCourseSection._id);
    await isCourseExist.save({ session });

    await session.commitTransaction();

    await axios.all([
      axios.get(
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/dashboard/my-courses/${isCourseExist._id}`
      ),
      axios.get(
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/courses/${isCourseExist._id}`
      ),
    ]);

    res.status(201).json({ message: "Амжилттай", body: newCourseSection });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

interface CourseSectionParams {
  id?: string;
}

export const updateCourseSection: RequestHandler<
  CourseSectionParams,
  unknown,
  CourseSectionBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  const instructorId = req.session.userId;

  try {
    assertIsDefined(instructorId);

    // Хүсэлтээс ирж буй мэдээлэл бүрэн эсэхийг шалгах
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");
    if (!title) throw createHttpError(400, "Гарчиг заавал шаардлагатай.");

    // Сургалтын сэдэв байгаа эсэхийг шалгах байвал үргэлжлүүлэх
    const courseSection = await CourseSectionModel.findById(id).populate("course");
    if (!courseSection) throw createHttpError(404, "Сургалтын сэдэв олдсонгүй.");

    if (
      instructorId.toString() !==
      (courseSection.course as unknown as ICourse).instructor?.toString()
    ) {
      throw createHttpError(403, "Танд энэ сэдвийг засах эрх байхгүй байна.");
    }

    // Сургалтын сэдвийн мэдээллийг өөрчлөх. Зөвхөн гарчигийн мэдээлэл өөрчилөх боломжтой. Хамааралтай сургалтын мэдээлэл өөрчлөх боломжгүй. Бас сэдэвт бүртгэлтэй байгаа хичээлүүдийг courseLesson хэсгээс устгана.
    courseSection.title = title;
    const editedCourseSection = await courseSection.save();

    await axios.all([
      axios.get(
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${
          env.REVALIDATE_SECRET
        }&path=/instructors/dashboard/my-courses/${
          (courseSection.course as unknown as ICourse)._id
        }`
      ),
      axios.get(
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/courses/${
          (courseSection.course as unknown as ICourse)._id
        }`
      ),
    ]);

    res.status(200).json({ message: "Амжилттай", body: editedCourseSection });
  } catch (error) {
    next(error);
  }
};

export const deleteCourseSection: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const session = await mongoose.startSession();

  const instructorId = req.session.userId;

  try {
    assertIsDefined(instructorId);

    // Хүсэлтээс орж ирж буй id зөв эсэхийг шалгах
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    session.startTransaction();

    // Сургалтын сэдэв байгаа эсэхийг шалгах байвал үргэлжлүүлэх
    const courseSection = await CourseSectionModel.findById(id, null, { session });
    if (!courseSection) throw createHttpError(404, "Сургалтын сэдэв олдсонгүй.");

    // Хамааралтай сургалтаас устгагдаж буй сэдэвийн id-г устгах
    const course = await CourseModel.findById(courseSection.course, null, { session });
    if (course) {
      if (instructorId.toString() !== course.instructor?.toString()) {
        throw createHttpError(403, "Танд энэ сэдвийг устгах эрх байхгүй байна.");
      }

      const updatedSections = course.sections.filter(
        (section) => section?._id !== courseSection._id
      );
      course.sections = updatedSections;
      await course.save({ session });
    }

    // Сургалтын сэдвээ устгах
    await courseSection.deleteOne({ session });

    await session.commitTransaction();

    if (course) {
      await axios.all([
        axios.get(
          `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/dashboard/my-courses/${course._id}`
        ),
        axios.get(
          `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/courses/${course._id}`
        ),
      ]);
    }

    res.sendStatus(204);
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

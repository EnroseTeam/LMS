import CourseLessonModel, { LessonLength } from "../models/courseLesson";
import CourseSectionModel from "../models/courseSection";
import CourseModel from "../models/course";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { RequestHandler } from "express";
import assertIsDefined from "../utils/assertIsDefined";
import axios from "axios";
import env from "../configs/validateEnv";

interface CourseLessonBody {
  name?: string;
  description?: string;
  video?: string;
  length?: LessonLength;
  type?: string;
  section?: string;
}

interface CourseLessonParams {
  id?: string;
}

export const getLessonIds: RequestHandler = async (req, res, next) => {
  try {
    const result = await CourseLessonModel.find().select({ _id: 1 });
    const data = result.map((id) => id._id);
    res.status(200).json({ message: "Амжилттай", body: data });
  } catch (error) {
    next(error);
  }
};

export const getCourseLessons: RequestHandler = async (req, res, next) => {
  try {
    // Бүртгэлтэй бүх хичээлээ олоод буцаана. Ирээдүйд энэ үйлдлийг устгаж магадгүй. Бүх хичээлийг нэг дор харах үйлдэл байхгүй байх. Сургалтанд хамаарагдах хичээлийг course хэсгээс populate хийгээд авах боломжтой.
    const courseLessons = await CourseLessonModel.find().populate("section");
    res.status(200).json({ message: "Амжилттай", body: courseLessons });
  } catch (error) {
    next(error);
  }
};

export const getSingleCourseLesson: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    // Хүсэлтээс орж ирсэн id зөв эсэхийг шалгана.
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    const user = await UserModel.findById(userId).select("+boughtCourses +ownCourses");
    if (!user) throw createHttpError(404, "Хэрэглэгч олдсонгүй.");

    // Орж ирсэн id-тай хичээл байгаа эсэхийг шалгана. Байвал буцаана.
    const courseLesson = await CourseLessonModel.findById(id).populate("section");
    if (!courseLesson) throw createHttpError(404, "Хичээл олдсонгүй");

    const boughtCourses = user.boughtCourses.map((courseId) => courseId?.toString());
    const ownCourses = user.ownCourses.map((courseId) => courseId?.toString());

    if (
      !boughtCourses.includes(courseLesson.section.course?.toString()) &&
      !ownCourses.includes(courseLesson.section.course?.toString())
    )
      throw createHttpError(403, "Танд энэ сургалтыг үзэх эрх байхгүй байна.");

    res.status(200).json({ message: "Амжилттай", body: courseLesson });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createCourseLesson: RequestHandler<
  unknown,
  unknown,
  CourseLessonBody,
  unknown
> = async (req, res, next) => {
  const { name, description, video, length, type, section } = req.body;

  const session = await mongoose.startSession();

  try {
    // Хүсэлтээс ирж буй мэдээлэл бүрэн эсэхийг шалгана.
    if (!name) throw createHttpError(400, "Гарчиг заавал шаардлагатай.");
    if (!length) throw createHttpError(400, "Хичээлийн хугацаа заавал шаардлагатай.");
    if (!type) throw createHttpError(400, "Хичээлийн төрөл заавал шаардлагатай.");
    if (!section) throw createHttpError(400, "Сэдвийн id заавал шаардлагатай.");
    if (!mongoose.isValidObjectId(section)) throw createHttpError(400, "Сэдвийн id буруу байна.");

    session.startTransaction();

    // Орж ирсэн сэдэвийн id-тай сэдэв бүртгэлтэй байгаа эсэхийг шалгана. Байвал цааш үргэлжлүүлнэ.
    const isSectionExist = await CourseSectionModel.findById(section, null, { session });
    if (!isSectionExist) throw createHttpError(404, "Хамаарах сэдэв олдсонгүй.");

    // Шинэ хичээлээ үүсгэнэ.
    const [newCourseLesson] = await CourseLessonModel.create(
      [
        {
          name,
          description,
          video,
          length,
          type,
          section,
        },
      ],
      { session }
    );

    // Үүссэн шинэ хичээлийн id-г хамааралтай сэдэврүү нэмнэ.
    isSectionExist.lessons.push(newCourseLesson._id);
    await isSectionExist.save({ session });

    // Сургалтан дээр байгаа хичээлийн тоог нэмэх
    const course = await CourseModel.findById(isSectionExist.course, null, { session });

    // Сургалтан дээр байгаа нийт хичээлийн уртыг нэмэх
    if (course) {
      course.lessonCount += 1;

      course.totalLessonLength.second += length.second;
      course.totalLessonLength.minute += length.minute;
      course.totalLessonLength.hour += length.hour;
      if (course.totalLessonLength.second >= 60) {
        course.totalLessonLength.second -= 60;
        course.totalLessonLength.minute += 1;
      }
      if (course.totalLessonLength.minute >= 60) {
        course.totalLessonLength.minute -= 60;
        course.totalLessonLength.hour += 1;
      }
      await course.save({ session });
    }

    await session.commitTransaction();

    if (course) {
      await axios.all([
        axios.get(
          `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/courses/${course._id}`
        ),
        axios.get(
          `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/dashboard/my-courses/${course._id}`
        ),
      ]);
    }

    res
      .status(201)
      .json({ message: `${name} нэртэй хичээл амжилттай нэмэгдлээ.`, body: newCourseLesson });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

export const updateCourseLesson: RequestHandler<
  CourseLessonParams,
  unknown,
  CourseLessonBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, video, length, type } = req.body;

  const instructorId = req.session.userId;

  const session = await mongoose.startSession();

  try {
    assertIsDefined(instructorId);

    // Хүсэлтээс ирж буй мэдээлэл бүрэн эсэхийг шалгана.
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна");
    if (!name) throw createHttpError(400, "Гарчиг заавал шаардлагатай.");
    if (!length) throw createHttpError(400, "Хичээлийн хугацаа заавал шаардлагатай.");
    if (!type) throw createHttpError(400, "Хичээлийн төрөл заавал шаардлагатай.");

    session.startTransaction();

    // Орж ирсэн id-тай хичээл бүртгэлтэй эсэхийг шалгана. Байвал цааш үргэлжлүүлнэ.
    const courseLesson = await CourseLessonModel.findById(id, null, { session }).populate({
      path: "section",
    });
    if (!courseLesson) throw createHttpError(404, "Хичээл олдсонгүй.");

    const course = await CourseModel.findById(courseLesson.section.course, null, { session });

    if (instructorId.toString() !== course?.instructor?.toString()) {
      throw createHttpError(403, "Танд энэ хичээлийг засах эрх байхгүй байна.");
    }

    if (course) {
      course.totalLessonLength.hour =
        course.totalLessonLength.hour + (length.hour - courseLesson.length.hour);
      course.totalLessonLength.minute =
        course.totalLessonLength.minute + (length.minute - courseLesson.length.minute);
      course.totalLessonLength.second =
        course.totalLessonLength.second + (length.second - courseLesson.length.second);

      if (course.totalLessonLength.second >= 60) {
        course.totalLessonLength.second -= 60;
        course.totalLessonLength.minute += 1;
      }

      if (course.totalLessonLength.minute >= 60) {
        course.totalLessonLength.minute -= 60;
        course.totalLessonLength.hour += 1;
      }

      await course.save({ session });
    }

    // Хичээлийн мэдээллийг хүсэлтээс орж ирсэн мэдээллээр солино.
    courseLesson.name = name;
    courseLesson.description = description;
    courseLesson.video = video;
    courseLesson.length = length;
    courseLesson.type = type;

    // Өөрчлөлтөө хадгална.
    const editedCourseLesson = await courseLesson.save({ session });

    await session.commitTransaction();

    if (course) {
      await axios.all([
        axios.get(
          `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/courses/${course._id}`
        ),
        axios.get(
          `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/dashboard/my-courses/${course._id}`
        ),
      ]);
    }

    res.status(200).json({
      message: `${name} нэртэй хичээлийн мэдээлэл амжилттай шинэчлэгдлээ.`,
      body: editedCourseLesson,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

export const deleteCourseLesson: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const session = await mongoose.startSession();

  const instructorId = req.session.userId;

  try {
    assertIsDefined(instructorId);

    // Хүсэлтээс орж ирсэн id зөв эсэхийг шалгана.
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    session.startTransaction();

    // Орж ирсэн id-тай хичээл байгаа эсэхийг шалгана. Байвал цааш үргэлжлүүлнэ.
    const courseLesson = await CourseLessonModel.findById(id, null, { session });
    if (!courseLesson) throw createHttpError(404, "Хичээл олдсонгүй.");

    // Хамааралтай сэдвийг id-р нь олоод устгах гэж буй хичээлийн id-г хасна.
    const courseSection = await CourseSectionModel.findById(courseLesson.section, null, {
      session,
    });

    const course = await CourseModel.findById(courseSection?.course, null, { session });
    if (instructorId.toString() !== course?.instructor?.toString()) {
      throw createHttpError(403, "Танд энэ хичээлийг устгах эрх байхгүй байна.");
    }

    if (course) {
      course.lessonCount -= 1;

      course.totalLessonLength.second -= courseLesson.length.second;
      course.totalLessonLength.minute -= courseLesson.length.minute;
      course.totalLessonLength.hour -= courseLesson.length.hour;

      if (course.totalLessonLength.second < 0) {
        course.totalLessonLength.second += 60;
        course.totalLessonLength.minute -= 1;
      }

      if (course.totalLessonLength.minute < 0) {
        course.totalLessonLength.minute += 60;
        course.totalLessonLength.hour -= 1;
      }

      await course.save({ session });
    }

    if (courseSection) {
      courseSection.lessons = courseSection.lessons.filter(
        (lesson) => lesson?._id !== courseLesson._id
      );
      await courseSection.save({ session });
    }

    // Хичээлээ устгана
    await courseLesson.deleteOne({ session });

    await session.commitTransaction();

    if (course) {
      await axios.all([
        axios.get(
          `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/courses/${course._id}`
        ),
        axios.get(
          `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/dashboard/my-courses/${course._id}`
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

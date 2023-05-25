import { RequestHandler } from "express";
import CourseModel from "../models/course";
import CourseCategoryModel from "../models/courseCategory";
import CourseLevelModel from "../models/courseLevel";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import axios from "axios";
import env from "../configs/validateEnv";
import assertIsDefined from "../utils/assertIsDefined";

export const getCourseCounts: RequestHandler = async (req, res, next) => {
  try {
    const courses = await CourseModel.find({ isPublished: true });

    const ratingCount = [
      { rating: 4.5, count: 0 },
      { rating: 4, count: 0 },
      { rating: 3.5, count: 0 },
      { rating: 3, count: 0 },
    ];

    const priceCount = [
      { label: "Бүгд", minPrice: 0, maxPrice: 10000000, count: 0 },
      { label: "Үнэтэй", minPrice: 1, maxPrice: 10000000, count: 0 },
      { label: "Үнэгүй", minPrice: 0, maxPrice: 0, count: 0 },
    ];

    const lengthCount = [
      { label: "3-аас бага цаг", minLength: 0, maxLength: 3, count: 0 },
      { label: "4 - 7 цаг", minLength: 4, maxLength: 7, count: 0 },
      { label: "8 - 18 цаг", minLength: 8, maxLength: 18, count: 0 },
      { label: "20-оос дээш цаг", minLength: 20, maxLength: 10000, count: 0 },
    ];

    ratingCount.map((rCount) => {
      courses.map((course) => {
        if (course.avgRating >= rCount.rating) rCount.count = rCount.count + 1;
      });
    });

    priceCount.map((pCount) => {
      courses.map((course) => {
        if (course.price >= pCount.minPrice && course.price <= pCount.maxPrice) pCount.count += 1;
      });
    });

    lengthCount.map((lCount) => {
      courses.map((course) => {
        if (
          course.totalLessonLength.hour >= lCount.minLength &&
          course.totalLessonLength.hour <= lCount.maxLength
        )
          lCount.count += 1;
      });
    });

    res.status(200).json({ ratingCount, priceCount, lengthCount });
  } catch (error) {
    next(error);
  }
};

interface CoursesQueries {
  category?: string;
  rating?: string;
  sort?: string;
  instructor?: string;
  price?: string;
  level?: string;
  length?: string;
  pageSize?: string;
  page?: string;
}

export const getCourseByUserId: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;

  try {
    const user = await UserModel.findById(userId).select("+boughtCourses");
    if (!user) throw createHttpError(404, "Хэрэглэгч олдсонгүй.");

    const courses = await CourseModel.find({ _id: { $in: user.boughtCourses } }).populate([
      "level",
      "instructor",
    ]);

    res.status(200).json({ body: courses });
  } catch (error) {
    next(error);
  }
};

export const getCourseByInstructorId: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;

  try {
    const user = await UserModel.findById(userId).select({ ownCourses: 1 });
    if (!user) throw createHttpError(404, "Хэрэглэгч олдсонгүй.");

    const courses = await CourseModel.find({ _id: { $in: user.ownCourses } }).populate(["level"]);

    res.status(200).json({ body: courses });
  } catch (error) {
    next(error);
  }
};

export const getAllCourseIds: RequestHandler = async (req, res, next) => {
  try {
    const courses = await CourseModel.find().select({ _id: 1 });
    const courseIds = courses.map((course) => course._id);

    res.status(200).json({ body: courseIds });
  } catch (error) {
    next(error);
  }
};

export const getPublishedCourseIds: RequestHandler = async (req, res, next) => {
  try {
    const courses = await CourseModel.find({ isPublished: true }).select({ _id: 1 });
    const courseIds = courses.map((course) => course._id);

    res.status(200).json({ body: courseIds });
  } catch (error) {
    next(error);
  }
};

export const getCourses: RequestHandler<unknown, unknown, unknown, CoursesQueries> = async (
  req,
  res,
  next
) => {
  const {
    category,
    rating = "0",
    sort = "popular",
    instructor,
    price = "0-10000000",
    level,
    length = "0-10000",
    pageSize = "12",
    page = "1",
  } = req.query;

  try {
    const [minLength, maxLength] = length.split("-").map((length) => Number(length));

    let searchLevels: string[] | RegExp[] = [""];
    if (level) {
      searchLevels = level.split(",");
    }

    searchLevels = searchLevels.map((level) => new RegExp("^" + level, "i"));
    const levels = await CourseLevelModel.find({ slug: { $in: searchLevels } });

    let order = "";
    switch (sort) {
      case "newest":
        order = "-createdAt";
        break;
      case "nameAsc":
        order = "name";
        break;
      case "nameDesc":
        order = "-name";
        break;
      default:
        order = "-avgRating";
        break;
    }

    // Хүсэлтээс ирж буй үнийн хамгийн бага болон хамгийн их дүнг салгаж тоон утга болгон массивд хадгална.
    const [minPrice, maxPrice] = price.split("-").map((price) => Number(price));

    // Багшийн нэрээр шүүх
    let searchInstructors: string[] = [];
    if (instructor) {
      searchInstructors = instructor.split(",");
    } else {
      const instructors = await UserModel.find().select({ _id: 1 });
      searchInstructors = instructors.map((instructor) => instructor._id.toString());
    }
    // Query-ээр орж ирсэн ангилалуудын id-г олж авна.
    let searchCategories: string[] | RegExp[] = [""];
    if (category) {
      searchCategories = category.split(",");
    }

    searchCategories = searchCategories.map((search) => new RegExp("^" + search, "i"));
    const categories = await CourseCategoryModel.find({ slug: { $in: searchCategories } });

    // Орж ирсэн ангилалын дагуу сургалтуудыг шүүгээд буцаана. Хэрэв ангилал байхгүй бол бүх сургалтыг буцаана.
    const courses = await CourseModel.find({
      category: { $in: categories },
      avgRating: { $gte: Number(rating) },
      instructor: { $in: searchInstructors },
      price: { $gte: minPrice, $lte: maxPrice },
      level: { $in: levels },
      "totalLessonLength.hour": { $gte: minLength, $lte: maxLength },
      isPublished: true,
    })
      .sort(order)
      .limit(Number(pageSize))
      .skip((Number(page) - 1) * Number(pageSize))
      .populate([
        { path: "instructor", select: { fullName: 1, avatar: 1 } },
        { path: "level", select: { name: 1 } },
        { path: "category", select: { name: 1, slug: 1 } },
      ]);

    const totalCourses = await CourseModel.find({
      category: { $in: categories },
      avgRating: { $gte: Number(rating) },
      instructor: { $in: searchInstructors },
      price: { $gte: minPrice, $lte: maxPrice },
      level: { $in: levels },
      "totalLessonLength.hour": { $gte: minLength, $lte: maxLength },
      isPublished: true,
    }).count();

    const totalPages = Math.ceil(totalCourses / Number(pageSize));

    res.status(200).json({
      message: "Амжилттай",
      page: Number(page),
      pageSize: Number(pageSize),
      totalCourses,
      totalPages,
      body: courses,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSingleCourse: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Хүсэлтээр орж ирсэн id зөв байгаа эсэхийг шалгана.
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна");

    // Орж ирсэн id-тай сургалт байгаа эсэхийг шалгаад байвал буцаана.
    const course = await CourseModel.findById(id).populate([
      { path: "instructor" },
      "level",
      "category",
      { path: "reviews", populate: ["user", "answer"] },
      { path: "sections", populate: { path: "lessons" } },
    ]);
    if (!course) throw createHttpError(404, "Цуврал хичээл олдсонгүй");

    res.status(200).json({ message: "Амжилттай", body: course });
  } catch (error) {
    next(error);
  }
};

interface CourseBody {
  name?: string;
  description?: string;
  picture?: string;
  video?: string;
  instructor?: string;
  level?: string;
  category?: string;
  requirements?: string[];
  goals?: string[];
  price?: number;
  discountPrice?: number;
}

export const createCourse: RequestHandler<unknown, unknown, CourseBody, unknown> = async (
  req,
  res,
  next
) => {
  const { name, description, level, category, requirements, goals, price, discountPrice } =
    req.body;
  const instructorId = req.session.userId;

  const session = await mongoose.startSession();

  try {
    // Хүсэлтээс орж ирж байгаа мэдээлэл бүрэн байгаа эсэхийг шалгана.
    if (!name) throw createHttpError(400, "Гарчиг заавал шаардлагатай");
    if (!description) throw createHttpError(400, "Тайлбар заавал шаардлагатай");
    if (!level) throw createHttpError(400, "Хичээлийн түвшин заавал шаардлагатай");
    if (!price) throw createHttpError(400, "Хичээлийн үнэ заавал шаардлагатай");
    if (!category) throw createHttpError(400, "Хичээлийн ангилал заавал шаардлагатай");
    if (!requirements)
      throw createHttpError(400, "Хичээлд шаардагдах чадварууд заавал шаардлагатай");
    if (!goals) throw createHttpError(400, "Хичээлийн зорилго заавал шаардлагатай");
    if (!mongoose.isValidObjectId(instructorId))
      throw createHttpError(400, "Багшийн id буруу байна.");
    if (!mongoose.isValidObjectId(level)) throw createHttpError(400, "Түвшингийн id буруу байна.");
    if (!mongoose.isValidObjectId(category))
      throw createHttpError(400, "Ангилалын id буруу байна.");

    session.startTransaction();

    // Хүсэлтээр орж ирсэн багшийн id-тай багш бүртгэлтэй байгааг шалгана. Байвал цааш үргэлжлүүлнэ.
    const isInstructorExist = await UserModel.findById(instructorId, null, { session });
    if (!isInstructorExist) throw createHttpError(404, "Багш олдсонгүй");

    // Хүсэлтээр орж ирсэн түвшингийн id-тай түвшин бүртгэлтэй байгааг шалгана. Байвал цааш үргэлжлүүлнэ.
    const isLevelExist = await CourseLevelModel.findById(level, null, { session });
    if (!isLevelExist) throw createHttpError(404, "Хичээлийн түвшин олдсонгүй");

    // Хүсэлтээр орж ирсэн ангилалын id-тай ангилал бүртгэлтэй байгааг шалгана. Байвал цааш үргэлжлүүлнэ.
    const isCategoryExist = await CourseCategoryModel.findById(category, null, { session });
    if (!isCategoryExist) throw createHttpError(404, "Хичээлийн ангилал олдсонгүй");

    // Орж ирсэн мэдээллийн дагуу шинэ сургалт үүсгэнэ.
    const [newCourse] = await CourseModel.create(
      [
        {
          name,
          description,
          instructor: instructorId,
          level,
          category,
          requirements,
          goals,
          price,
          discountPrice,
        },
      ],
      { session }
    );

    // Шинээр үүссэн сургалтын id-г бүртгэлтэй багшийн мэдээлэлрүү нэмнэ
    isInstructorExist.ownCourses.push(newCourse._id);
    await isInstructorExist.save({ session });

    await session.commitTransaction();

    res
      .status(201)
      .json({ message: `${name} нэртэй цуврал хичээл амжилттай нэмэгдлээ`, body: newCourse });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

interface CourseParams {
  id?: string;
}

export const addMediaToCourse: RequestHandler<CourseParams, unknown, CourseBody, unknown> = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { picture, video } = req.body;
  const userId = req.session.userId;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");
    if (!picture) throw createHttpError(400, "Зураг заавал шаардалгатай.");
    if (!video) throw createHttpError(400, "Танилцуулга бичлэг заавал шаардлагатай.");

    const course = await CourseModel.findById(id);
    if (!course) throw createHttpError(404, "Сургалт олдсонгүй.");

    if (course.instructor?.toString() !== userId?.toString()) {
      throw createHttpError(403, "Танд энэ сургалтыг шинэчлэх эрх байхгүй байна.");
    }

    course.picture = picture;
    course.video = video;

    await course.save();

    await axios.all([
      axios.get(`${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/`),
      axios.get(
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/courses/${course._id}`
      ),
      axios.get(
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/dashboard/my-courses/${course._id}`
      ),
      axios.get(
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/${course.instructor}`
      ),
    ]);

    res.status(200).json({ message: "Зураг болон бичлэг амжилттай нэмэгдлээ." });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateCourse: RequestHandler<CourseParams, unknown, CourseBody, unknown> = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { name, description, category, requirements, goals, level, price, discountPrice } =
    req.body;
  const userId = req.session.userId;

  const session = await mongoose.startSession();

  try {
    // Хүсэлтээс орж ирсэн мэдээлэл бүрэн байгаа эсэхийг шалгана.
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");
    if (!name) throw createHttpError(400, "Гарчиг заавал шаардлагатай");
    if (!description) throw createHttpError(400, "Тайлбар заавал шаардлагатай");
    if (!category) throw createHttpError(400, "Хичээлийн ангилал заавал шаардлагатай");
    if (!requirements)
      throw createHttpError(400, "Хичээлд шаардагдах чадварууд заавал шаардлагатай");
    if (!goals) throw createHttpError(400, "Хичээлийн зорилго заавал шаардлагатай");
    if (!mongoose.isValidObjectId(level)) throw createHttpError(400, "Түвшингийн id буруу байна.");
    if (!mongoose.isValidObjectId(category))
      throw createHttpError(400, "Ангилалын id буруу байна.");
    if (!price) throw createHttpError(400, "Үнэ заавал шаардлагатай.");

    session.startTransaction();

    // Хүсэлтээс орж ирсэн түвшин байгаа эсэхийг шалгана. Байвал цааш үргэлжлүүлнэ.
    const isLevelExist = await CourseLevelModel.findById(level, null, { session });
    if (!isLevelExist) throw createHttpError(404, "Сонгосон түвшин олдсонгүй.");

    // Хүсэлтээс орж ирсэн ангилал байгаа эсэхийг шалгана. Байвал цааш үргэлжлүүлнэ.
    const isCategoryExist = await CourseCategoryModel.findById(category, null, { session });
    if (!isCategoryExist) throw createHttpError(404, "Сонгосон ангилал олдсонгүй.");

    // Хүсэлтээс орж ирсэн id-тай сургалт байгаа эсэхийг шалгана. Байвал цааш үргэлжлүүлнэ.
    const course = await CourseModel.findById(id, null, { session });
    if (!course) throw createHttpError(404, "Сургалт олдсонгүй.");

    if (course.instructor?.toString() !== userId?.toString()) {
      throw createHttpError(403, "Танд энэ сургалтыг шинэчлэх эрх байхгүй байна.");
    }

    // Хүсэлтээр орж ирсэн түвшин болон ангилал, өмнө нь сургалтанд бүртгэлтэй байгаа түвшин болон ангилалтай адилхан байгаа эсэхийг шалгана.
    const isLevelSame = course.level?.toString() === level;
    const isCategorySame = course.category?.toString() === category;

    // Хүсэлтээр орж ирсэн түвшин болон өмнө нь бүртгэлтэй байсан түвшин өөр байвал хуучин түвшний сургалтын тооноос нэгийг хасаад шинэ дээр нь нэгийг нэмнэ
    if (!isLevelSame && course.isPublished) {
      const oldLevel = await CourseLevelModel.findById(course.level, null, { session });
      if (oldLevel) {
        oldLevel.courseCount -= 1;
        await oldLevel.save({ session });
      }
      isLevelExist.courseCount += 1;
      await isLevelExist.save({ session });
    }

    // Хүсэлтээр орж ирсэн ангилал болон өмнө нь бүртгэлтэй байсан ангилал өөр байвал хуучин түвшний сургалтын тооноос нэгийг хасаад шинэ дээр нь нэгийг нэмнэ
    if (!isCategorySame && course.isPublished) {
      const oldCategory = await CourseCategoryModel.findById(course.category, null, { session });
      if (oldCategory) {
        oldCategory.courseCount -= 1;
        await oldCategory.save({ session });
      }
      isCategoryExist.courseCount += 1;
      await isCategoryExist.save({ session });
    }

    // Хүсэлтээр орж ирсэн мэдээллийн дагуу сургалтын мэдээллийг шинэчлэнэ.
    await course.updateOne(
      { name, description, category, level, requirements, goals, price, discountPrice },
      { session }
    );

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
        `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/${course.instructor}`
      ),
    ]);

    res.status(200).json({ message: "Амжилттай" });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

export const deleteCourse: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const instructorId = req.session.userId;

  const session = await mongoose.startSession();

  try {
    assertIsDefined(instructorId);

    // Хүсэлтээс орж ирсэн id зөв эсэхийг шалгана.
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    session.startTransaction();

    // Хүсэлтээр орж ирсэн id-тай сургалт байгаа эсэхийг шалгана. Байвал цааш үргэлжлүүлнэ.
    const course = await CourseModel.findById(id, null, { session });
    if (!course) throw createHttpError(404, "Сургалт олдсонгүй.");

    if (instructorId.toString() !== course.instructor?.toString()) {
      throw createHttpError(403, "Танд энэ сургалтыг устгах эрх байхгүй байна.");
    }

    if (course.isPublished) throw createHttpError(400, "Нийтлэгдсэн сургалтыг устгах боломжгүй!");

    // Сургалтанд бүртгэлтэй байгаа багшийг олоод сургалтын жагсаалтаас устгах сургалтын id-г хасна.
    const instructor = await UserModel.findById(course.instructor, null, { session });
    if (instructor) {
      instructor.ownCourses = instructor.ownCourses.filter(
        (instCourse) => instCourse?._id !== course._id
      );
      await instructor.save({ session });
    }

    // Сургалтаа устгах
    await course.deleteOne({ session });

    await session.commitTransaction();

    await axios.get(
      `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/dashboard/my-courses/${course._id}`
    );

    res.sendStatus(204);
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

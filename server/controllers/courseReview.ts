import CourseReviewModel, { ICourseReview } from "../models/courseReview";
import CourseModel, { ICourse } from "../models/course";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { RequestHandler } from "express";

interface CourseReviewBody {
  title?: string;
  text?: string;
  rating?: number;
  course?: string;
}

interface CourseReviewParams {
  id: string;
}

//GET REVIEWS BY INSTRUCTORS ID
export const getReviewByInstructorId: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;

  try {
    interface PopulatedCourse extends Omit<ICourse, "reviews"> {
      reviews: ICourseReview[];
    }

    const user = await UserModel.findById(userId).select("+ownCourses");
    if (!user) throw createHttpError(404, "Хэрэглэгч олдсонгүй.");

    const courses: PopulatedCourse[] = await CourseModel.find({
      _id: { $in: user.ownCourses },
    }).populate([{ path: "reviews", populate: ["user", "answer"] }]);

    const result: ICourseReview[] = [];

    for (const course of courses) {
      for (const review of course.reviews) {
        result.push(review);
      }
    }

    res.status(200).json({ body: result });
  } catch (error) {
    next(error);
  }
};

export const getTestimonials: RequestHandler = async (req, res, next) => {
  try {
    const testimonials = await CourseReviewModel.find({ testimonial: true }).populate("user");

    res.status(200).json({ message: "Амжилттай", body: testimonials });
  } catch (error) {
    next(error);
  }
};

//GET ALL REVIEWS
export const getCourseReviews: RequestHandler = async (req, res, next) => {
  try {
    // Бүх сэтгэгдлээ олоод буцаана. Буцаахдаа user хэсгийг populate хийж буцаана.
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
    // Хүсэлтээс ирсэн id зөв эсэхийг шалгана.
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    // Id-р сэтгэгдлээ олоод буцаана. Буцаахдаа user хэсгийг populate хийнэ.
    const review = await CourseReviewModel.findById(id).populate("user");
    if (!review) throw createHttpError(404, "Сэтгэгдэл олдсонгүй.");

    res.status(200).json({ message: "Амжилттай", body: review });
  } catch (error) {
    next(error);
  }
};

export const makeTestimonial: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    const review = await CourseReviewModel.findById(id);
    if (!review) throw createHttpError(404, "Сэтгэгдэл олдсонгүй.");

    review.testimonial = true;
    await review.save();

    res.status(200).json({ message: "Сэтгэгдэл амжилттай нүүр хэсэгт гарлаа." });
  } catch (error) {
    next(error);
  }
};

export const removeTestimonial: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    const review = await CourseReviewModel.findById(id);
    if (!review) throw createHttpError(404, "Сэтгэгдэл олдсонгүй.");
    if (!review.testimonial)
      throw createHttpError(400, "Сэтгэгдэл нүүр хуудсан дээр байхгүй байна.");

    review.testimonial = false;
    await review.save();

    res.status(200).json({ message: "Сэтгэгдэл нүүр хуудаснаас амжилттай устлаа." });
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
  const { title, text, rating, course } = req.body;

  const userId = req.session.userId;
  const session = await mongoose.startSession();

  try {
    // Хүсэлтээс ирсэн мэдээлэл бүрэн эсэхийг шалгана.
    if (!title) throw createHttpError(400, "Гарчиг заавал шаардлагатай.");

    if (!rating) throw createHttpError(400, "Үнэлгээ заавал шаардлагатай.");
    if (!course) throw createHttpError(400, "Сургалтын id заавал шаардлагатай.");

    if (!mongoose.isValidObjectId(course)) throw createHttpError(400, "Сургалтын id буруу байна.");

    session.startTransaction();

    // Хүсэлтээс орж ирсэн сургалтын id-тай сургалт байгаа эсэхийг шалгана. Байвал цааш үргэлжлүүлнэ.
    const isCourseExist = await CourseModel.findById(course, null, { session });
    if (!isCourseExist) throw createHttpError(400, `${course} id-тай сургалт олдсонгүй.`);

    const isUserExist = await UserModel.findById(isCourseExist.instructor, null, {
      session,
    }).select("+ownCourses +avgRating");
    if (!isUserExist)
      throw createHttpError(400, `${isCourseExist.instructor} id-тай хэрэглэгч олдсонгүй.`);

    // Сургалтын дундаж үнэлгээг шинэчлэнэ.
    const totalRating = isCourseExist.avgRating * isCourseExist.reviews.length;
    isCourseExist.avgRating = (totalRating + Number(rating)) / (isCourseExist.reviews.length + 1);
    await isCourseExist.save({ session });

    // Сургалтыг заасан багшийн дундаж үнэлгээг шинэчлэнэ.
    let totalReviewLength = 0;
    for (let i = 0; i < isUserExist.ownCourses.length; i++) {
      const course = await CourseModel.findById(isUserExist.ownCourses[i], null, { session });
      if (course) totalReviewLength += course.reviews.length;
    }

    const totalUserRating = isUserExist.avgRating * totalReviewLength;

    isUserExist.avgRating = (totalUserRating + Number(rating)) / (totalReviewLength + 1);

    await isUserExist.save({ session });

    // Орж ирсэн мэдээллийн дагуу шинэ сэтгэгдэл үүсгэнэ.
    let [newReview] = await CourseReviewModel.create(
      [
        {
          title,
          text,
          user: userId,
          rating,
          course,
        },
      ],
      { session }
    );

    newReview = await newReview.populate("user");

    // Id-р барьж авсан сургалтруугаа шинээр үүссэн сэтгэгдлийн id-г нэмнэ.
    isCourseExist.reviews.push(newReview._id);
    await isCourseExist.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Амжилттай нэмэгдлээ.", body: newReview });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    next(error);
  }

  session.endSession();
};

//DELETE A REVIEW
export const deleteCourseReview: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const session = await mongoose.startSession();

  try {
    // Хүсэлтээс орж ирсэн id зөв эсэхийг шалгана.
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    session.startTransaction();

    // Орж ирсэн id-тай сэтгэгдэл байгаа эсэхийг шалгана. Байвал цааш үргэлжлүүлнэ.
    const review = await CourseReviewModel.findById(id, null, { session });
    if (!review) throw createHttpError(404, "Сэтгэгдэл олдсонгүй.");

    // Олдсон сэтгэгдэл дээр бүртгэлтэй байгаа сургалтын id-гаар сургалтаа олоод олдсон сургалтнаас устгагдаж буй сэтгэгдлийн id-г хасна.
    const course = await CourseModel.findById(review.course);
    if (course) {
      course.reviews = course.reviews.filter((curReview) => curReview?._id !== review._id);
      await course.save({ session });
    }

    // Сэтгэгдлээ устгана.
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
    // Хүсэлтээс ирж буй мэдээлэл бүрэн эсэхийг шалгана.
    if (!title) throw createHttpError(400, "Гарчиг заавал шаардлагатай.");
    if (!rating) throw createHttpError(400, "Үнэлгээ заавал шаардлагатай.");
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    // Орж ирсэн id-тай сэтгэгдэл байгаа эсэхийг шалгана. Байвал цааш үргэлжлүүлнэ.
    const review = await CourseReviewModel.findById(id);
    if (!review) throw createHttpError(404, "Сэтгэгдэл олдсонгүй.");

    // Олдсон сэтгэгдлийн мэдээллийг хүсэлтээс орж ирсэн мэдээллийн дагуу шинэчлэнэ. Энд сургалтын id-г солих шаардлагагүй. Сэтгэгдлийг шууд өөр сургалтруу шилжүүлэх үйлдэл огт хийгдэхгүй.
    await review.updateOne({
      title,
      text,
      rating,
    });

    res.status(200).json({ message: "Амжилттай шинэчлээ" });
  } catch (error) {
    next(error);
  }
};

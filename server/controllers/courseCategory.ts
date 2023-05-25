import CourseCategoryModel from "../models/courseCategory";
import createHttpError from "http-errors";
import slugify from "slugify";
import mongoose from "mongoose";
import { RequestHandler } from "express";
import axios from "axios";
import env from "../configs/validateEnv";

interface CourseCategoryBody {
  name?: string;
  image?: string;
  description?: string;
}

interface CourseCategoryParams {
  id?: string;
}

export const getAllCourseCategoriesId: RequestHandler = async (req, res, next) => {
  try {
    const courseCategories = await CourseCategoryModel.find().select({
      _id: 1,
    });

    const ids = courseCategories.map((courseCategory) => courseCategory._id);

    res.status(200).json({ body: ids });
  } catch (error) {
    next(error);
  }
};

export const getCourseCategories: RequestHandler = async (req, res, next) => {
  try {
    const courseCategories = await CourseCategoryModel.find();
    res.status(200).json({ message: "Амжилттай", body: courseCategories });
  } catch (error) {
    next(error);
  }
};

export const getSingleCourseCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна");

    const courseCategory = await CourseCategoryModel.findById(id);
    if (!courseCategory) throw createHttpError(404, "Ангилал олдсонгүй");

    res.status(200).json({ message: "Амжилттай", body: courseCategory });
  } catch (error) {
    next(error);
  }
};

export const createCourseCategory: RequestHandler<
  unknown,
  unknown,
  CourseCategoryBody,
  unknown
> = async (req, res, next) => {
  const { name, image, description } = req.body;

  try {
    if (!name) throw createHttpError(400, "Нэр заавал шаардлагатай");
    if (!image) throw createHttpError(400, "Зураг заавал шаардлагатай.");

    const slug = slugify(name).toLowerCase();
    const isSlugExist = await CourseCategoryModel.findOne({ slug });
    if (isSlugExist)
      throw createHttpError(
        400,
        `${name} нэртэй ангилал өмнө нь бүртгэгдсэн байна. Өөр нэр сонгоно уу...`
      );

    const newCourseCategory = await CourseCategoryModel.create({
      name,
      image,
      slug,
      description,
    });

    await axios.get(`${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/`);
    await axios.get(
      `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/dashboard/my-courses/create-course`
    );

    res.status(201).json({
      message: `${name} нэртэй ангилал амжилттай нэмэгдлээ.`,
      body: newCourseCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourseCategory: RequestHandler<
  CourseCategoryParams,
  unknown,
  CourseCategoryBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { name, image, description } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    if (!name) throw createHttpError(400, "Нэр заавал шаардлагатай");

    if (!image) throw createHttpError(400, "Зураг заавал шаардлагатай.");

    const slug = slugify(name).toLowerCase();
    const isSlugExist = await CourseCategoryModel.findOne({
      slug,
      _id: { $ne: id },
    });
    if (isSlugExist)
      throw createHttpError(
        400,
        `${name} нэртэй ангилал өмнө нь бүртгэгдсэн байна. Өөр нэр сонгоно уу...`
      );

    const courseCategory = await CourseCategoryModel.findById(id);
    if (!courseCategory) throw createHttpError(404, "Ангилал олдсонгүй.");

    courseCategory.name = name;
    courseCategory.image = image;
    courseCategory.description = description;
    courseCategory.slug = slug;

    const editedCourseCategory = await courseCategory.save();

    await axios.get(`${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/`);
    await axios.get(
      `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/dashboard/my-courses/create-course`
    );

    res.status(200).json({
      message: `${name} нэртэй ангилалын мэдээлэл амжилттай шинэчлэгдлээ.`,
      body: editedCourseCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourseCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    const courseCategory = await CourseCategoryModel.findById(id);
    if (!courseCategory) throw createHttpError(404, "Ангилал олдсонгүй.");

    if (courseCategory.courseCount > 0) {
      throw createHttpError(403, "Нэг болон түүнээс дээш сургалттай ангилалыг устгах боломжгүй.");
    }

    await courseCategory.deleteOne();

    await axios.get(`${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/`);
    await axios.get(
      `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/instructors/dashboard/my-courses/create-course`
    );

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

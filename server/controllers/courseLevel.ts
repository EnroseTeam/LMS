import CourseLevelModel from "../models/courseLevel";
import createHttpError from "http-errors";
import slugify from "slugify";
import mongoose from "mongoose";
import { RequestHandler } from "express";

interface CourseLevelBody {
  name?: string;
  description?: string;
}

interface CourseLevelParams {
  id: string;
}

export const getCourseLevels: RequestHandler = async (req, res, next) => {
  try {
    const courseLevels = await CourseLevelModel.find();
    res.status(200).json({ message: "Амжилттай", body: courseLevels });
  } catch (error) {
    next(error);
  }
};

export const getSingleCourseLevel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Id буруу байна.");

    const courseLevel = await CourseLevelModel.findById(id);
    if (!courseLevel) throw createHttpError(404, "Түвшин олдсонгүй");

    res.status(200).json({ message: "Амжилттай", body: courseLevel });
  } catch (error) {
    next(error);
  }
};

//CREATE NEW LEVEL

export const createCourseLevel: RequestHandler<
  unknown,
  unknown,
  CourseLevelBody,
  unknown
> = async (req, res, next) => {
  const { name, description } = req.body;

  try {
    if (!name) throw createHttpError(400, "Нэр заавал шаардлагатай.");

    const slug = slugify(name).toLowerCase();

    const isSlugExist = await CourseLevelModel.findOne({ slug });
    console.log(isSlugExist);

    if (isSlugExist)
      throw createHttpError(
        400,
        `${name} нэртэй түвшин бүртгэгдсэн байна. Өөр нэр сонгоно уу.`
      );

    const newCourseLevel = await CourseLevelModel.create({
      name,
      slug,
      description,
    });
    res.status(201).json({
      message: `${name} нэртэй түвшин амжилттай нэмэгдлээ.`,
      body: newCourseLevel,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourseLevel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Id буруу байна.");

    const courseLevel = await CourseLevelModel.findById(id);
    if (!courseLevel) throw createHttpError(404, "Түвшин олдсонгүй");

    await courseLevel.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updateCourseLevel: RequestHandler<
  CourseLevelParams,
  unknown,
  CourseLevelBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Id буруу байна.");

    if (!name) throw createHttpError(400, "Нэр заавал шаардлагатай.");

    const slug = slugify(name).toLowerCase();

    const isSlugExist = await CourseLevelModel.findOne({
      slug,
      _id: { $ne: id },
    });

    if (isSlugExist)
      throw createHttpError(
        400,
        `${name} нэртэй түвшин бүртгэгдсэн байна. Өөр нэр сонгоно уу.`
      );

    const courseLevel = await CourseLevelModel.findById(id);
    if (!courseLevel) throw createHttpError(404, "Түвшин олдсонгүй");

    courseLevel.name = name;
    courseLevel.slug = slug;
    courseLevel.description = description;

    const editedCourseLevel = await courseLevel.save();

    res
      .status(200)
      .json({
        message: `${name} нэртэй түвшин амжилттай шинэчлэгдлээ.`,
        body: editedCourseLevel,
      });
  } catch (error) {
    next(error);
  }
};

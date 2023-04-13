import CourseLevelModel from '../models/courseLevel';
import createHttpError from 'http-errors';
import slugify from 'slugify';
import mongoose from 'mongoose';
import { RequestHandler } from 'express';

interface CourseLevelBody {
  name?: string;
  description?: string;
}

interface CourseLevelParams {
  id: string;
}

export const getCourseLevels: RequestHandler = async (req, res, next) => {
  try {
    // Бүртгэлтэй бүх сургалтын түвшингүүдээ олоод буцаана. Ямар нэгэн филтэр байх шаардлагагүй.
    const courseLevels = await CourseLevelModel.find();
    res.status(200).json({ message: 'Амжилттай', body: courseLevels });
  } catch (error) {
    next(error);
  }
};

export const getSingleCourseLevel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Хүсэлтээс орж ирсэн id зөв эсэхийг шалгана.
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Id буруу байна.');

    // Орж ирсэн id-тай түвшин байгаа эсэхийг шалгана. Байвал буцаана.
    const courseLevel = await CourseLevelModel.findById(id);
    if (!courseLevel) throw createHttpError(404, 'Түвшин олдсонгүй');

    res.status(200).json({ message: 'Амжилттай', body: courseLevel });
  } catch (error) {
    next(error);
  }
};

//CREATE NEW LEVEL

export const createCourseLevel: RequestHandler<unknown, unknown, CourseLevelBody, unknown> = async (
  req,
  res,
  next
) => {
  const { name, description } = req.body;

  try {
    // Хүсэлтээс орж ирсэн мэдээлэл бүрэн эсэхийг шалгана.
    if (!name) throw createHttpError(400, 'Нэр заавал шаардлагатай.');

    // Slug үүсгээд өмнө нь адил slug-тай түвшин бүртгэгдсэн эсэхийг шалгана. Бүртгэгдсэн байвал алдаа буцаана.
    const slug = slugify(name).toLowerCase();
    const isSlugExist = await CourseLevelModel.findOne({ slug });
    console.log(isSlugExist);
    if (isSlugExist)
      throw createHttpError(400, `${name} нэртэй түвшин бүртгэгдсэн байна. Өөр нэр сонгоно уу.`);

    // Орж ирсэн мэдээллийн дагуу шинэ түвшин үүсгэнэ.
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

export const updateCourseLevel: RequestHandler<
  CourseLevelParams,
  unknown,
  CourseLevelBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    // Хүсэлтээс орж ирж буй мэдээлэл бүрэн эсэхийг шалгана.
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Id буруу байна.');
    if (!name) throw createHttpError(400, 'Нэр заавал шаардлагатай.');

    // Slug үүсгэнэ. Үүсгэхдээ хүсэлтээс ирж буй шинэ нэрээр үүсгэнэ. Үүсгэсэн slug давхцаж буй эсэхийг шалгана. Нэр өөрчлөгдөөгүй тохиолдолд өөрийгөө давхардсан гэж тооцох тул хайхдаа өөрийн id-тай тэнцэхгүй гэсэн нөхцөл тавьж өгсөн.
    const slug = slugify(name).toLowerCase();
    const isSlugExist = await CourseLevelModel.findOne({
      slug,
      _id: { $ne: id },
    });
    if (isSlugExist)
      throw createHttpError(400, `${name} нэртэй түвшин бүртгэгдсэн байна. Өөр нэр сонгоно уу.`);

    // Хүсэлтээс орж ирсэн id-тай түвшин бүртгэлтэй байгаа эсэхийг шалгана. Байвал цааш үргэлжлүүлнэ.
    const courseLevel = await CourseLevelModel.findById(id);
    if (!courseLevel) throw createHttpError(404, 'Түвшин олдсонгүй');

    // Мэдээллүүдийг нь хүсэлтээс орж ирсэн мэдээллүддээр шинэчлэнэ.
    courseLevel.name = name;
    courseLevel.slug = slug;
    courseLevel.description = description;

    // Шинэчлэсэн түвшингээ хадгална.
    const editedCourseLevel = await courseLevel.save();

    res.status(200).json({
      message: `${name} нэртэй түвшин амжилттай шинэчлэгдлээ.`,
      body: editedCourseLevel,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourseLevel: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Хүсэлтээс орж ирсэн id зөв байгаа эсэхийг шалгана.
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Id буруу байна.');

    // Орж ирсэн id-тай түвшин бүртгэлтэй байгаа эсэхийг шалгана.
    const courseLevel = await CourseLevelModel.findById(id);
    if (!courseLevel) throw createHttpError(404, 'Түвшин олдсонгүй');

    // Олдсон түвшингээ устгана.
    await courseLevel.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

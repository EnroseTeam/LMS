import createHttpError from "http-errors";
import mongoose from "mongoose";
import { RequestHandler } from "express";
import BlogModel from "../models/blog";
import assertIsDefined from "../utils/assertIsDefined";
import axios from "axios";
import env from "../configs/validateEnv";

interface BlogBody {
  name?: string;
  description?: string;
  text?: string;
  picture?: string;
  user?: string;
}

interface BlogParams {
  id: string;
}

export const getAllBlogId: RequestHandler = async (req, res, next) => {
  try {
    const blogs = await BlogModel.find().select({
      _id: 1,
    });

    const ids = blogs.map((blog) => blog._id);

    res.status(200).json({ body: ids });
  } catch (error) {
    next(error);
  }
};

//бүх мэдээг авч байгаа -
export const getBlogs: RequestHandler = async (req, res, next) => {
  try {
    //Хуудаслалт
    const { pageSize = "10", page = "1" } = req.query;

    const blogs = await BlogModel.find()
      .populate("user")
      .limit(Number(pageSize))
      .skip((Number(page) - 1) * Number(pageSize));

    const totalBlogs = await BlogModel.find().count();

    const totalPage = Math.ceil(totalBlogs / Number(pageSize));

    res.status(200).json({
      message: "Амжилттай",
      body: blogs,
      page: Number(page),
      pageSize: Number(pageSize),
      totalBlogs,
      totalPage,
    });
  } catch (error) {
    next(error);
  }
};

// ID-гаар авч байгаа мэдээ
export const getSingleBlog: RequestHandler<BlogParams, unknown, unknown, unknown> = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна");

    const blog = await BlogModel.findById(id);
    if (!blog) throw createHttpError(404, "Мэдээ олдсонгүй");

    res.status(200).json({ message: "Амжилттай", body: blog });
  } catch (error) {
    next(error);
  }
};

//Мэдээ шинээр үүсгэх
export const createBlog: RequestHandler<unknown, unknown, BlogBody, unknown> = async (
  req,
  res,
  next
) => {
  const { name, picture, text, description } = req.body;

  const userId = req.session.userId;

  try {
    assertIsDefined(userId);

    if (!name) throw createHttpError(400, "Нэр заавал шаардлагатай");
    if (!text) throw createHttpError(400, "Нэр заавал шаардлагатай");
    if (!picture) throw createHttpError(400, "Зураг заавал шаардлагатай.");

    const newBlog = await BlogModel.create({
      name,
      description,
      text,
      picture,
      user: userId,
    });

    await axios.get(`${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/`);

    res.status(201).json({
      message: `${name} мэдээ амжилттай нэмэгдлээ.`,
      body: newBlog,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Мэдээг шинэчлэх
export const updateBlog: RequestHandler<BlogParams, unknown, BlogBody, unknown> = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { name, picture, description, text, user } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    if (!name) throw createHttpError(400, "Нэр заавал шаардлагатай");

    if (!user) throw createHttpError(400, "Хэрэглэгч заавал шаардлагатай");

    if (!picture) throw createHttpError(400, "Зураг заавал шаардлагатай.");

    if (!text) throw createHttpError(400, "мэдээний агуулга заавал шаардлагатай.");

    if (!description) throw createHttpError(400, "мэдээний тайлбар заавал шаардлагатай.");

    const blog = await BlogModel.findById(id);
    if (!blog) throw createHttpError(404, "Ангилал олдсонгүй.");

    blog.name = name;
    blog.picture = picture;
    blog.description = description;
    blog.text = text;

    const editedBlog = await blog.save();

    await axios.get(`${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/`);
    res.status(200).json({
      message: `${name} нэртэй мэдээ амжилттай шинэчлэгдлээ.`,
      body: editedBlog,
    });
  } catch (error) {
    next(error);
  }
};

//Мэдээг устгах
export const deleteBlog: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    const blog = await BlogModel.findById(id);
    if (!blog) throw createHttpError(404, "мэдээ олдсонгүй.");

    await blog.deleteOne();

    await axios.get(`${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/`);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

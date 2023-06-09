import UserModel from "../models/user";
import CourseModel from "../models/course";
import { RequestHandler } from "express";
import { Types } from "mongoose";

interface SearchItem {
  _id: Types.ObjectId;
  name: string;
  image: string;
  type: "Course" | "Instructor";
  updatedAt: Date;
}

export const searchEverything: RequestHandler = async (req, res, next) => {
  try {
    const { q: search = "", pageSize = "9", page = "1" } = req.query;

    const users = await UserModel.find({
      $or: [
        { firstName: new RegExp(search + "", "i") },
        { lastName: new RegExp(search + "", "i") },
      ],
      role: "Instructor",
      "ownPublishedCourses.0": { $exists: true },
    });
    const courses = await CourseModel.find({
      name: new RegExp(search + "", "i"),
      isPublished: true,
    });

    const result: SearchItem[] = [];

    users.map((user) => {
      result.push({
        _id: user._id,
        name: user.fullName,
        image: user.avatar,
        type: "Instructor",
        updatedAt: user.updatedAt,
      });
    });

    courses.map((course) => {
      result.push({
        _id: course._id,
        name: course.name,
        image: course.picture,
        type: "Course",
        updatedAt: course.updatedAt,
      });
    });

    result.sort((a, b) => {
      return +b.updatedAt - +a.updatedAt;
    });

    const totalSearch = result.length;
    const totalPage = Math.ceil(totalSearch / Number(pageSize));

    const slicedResult = result.slice(
      (Number(page) - 1) * Number(pageSize),
      Number(page) * Number(pageSize)
    );

    res.status(200).json({
      message: "Амжилттай",
      body: slicedResult,
      page: Number(page),
      pageSize: Number(pageSize),
      totalSearch,
      totalPage,
    });
  } catch (error) {
    next(error);
  }
};

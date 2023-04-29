import UserModel from "../models/user";
import CourseModel from "../models/course";
import UserRoleModel from "../models/userRole";
import { RequestHandler } from "express";
import { Types } from "mongoose";

interface SearchItem {
  _id: Types.ObjectId;
  name: string;
  type: "Course" | "Instructor";
  updatedAt: Date;
}

export const searchEverything: RequestHandler = async (req, res, next) => {
  try {
    const { q: search = "" } = req.query;
    const instructorRole = await UserRoleModel.findOne({ slug: "instructor" });

    const users = await UserModel.find({
      $or: [
        { firstName: new RegExp(search + "", "i") },
        { lastName: new RegExp(search + "", "i") },
      ],
      role: instructorRole?._id,
    });
    const courses = await CourseModel.find({
      name: new RegExp(search + "", "i"),
    });

    const result: SearchItem[] = [];

    users.map((user) => {
      result.push({
        _id: user._id,
        name: user.fullName,
        type: "Instructor",
        updatedAt: user.updatedAt,
      });
    });

    courses.map((course) => {
      result.push({
        _id: course._id,
        name: course.name,
        type: "Course",
        updatedAt: course.updatedAt,
      });

      result.sort((a, b) => {
        return +b.updatedAt - +a.updatedAt;
      });

      res.status(200).json({ message: "Амжилттай", body: result });
    });
  } catch (error) {
    next(error);
  }
};

import { RequestHandler } from "express";
import { IUser } from "../models/user";
import UserRoleModel from "../models/userRole";
import UserModel from "../models/user";
import mongoose from "mongoose";
import createHttpError from "http-errors";

export const becomeInstructor: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;

  try {
    const instructorRole = await UserRoleModel.findOne({ slug: "instructor" });
    await UserModel.findByIdAndUpdate(userId, {
      role: instructorRole?._id,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const getAllInsturctorIds: RequestHandler = async (req, res, next) => {
  try {
    const instructorRole = await UserRoleModel.findOne({ slug: "instructor" });

    const instructors = await UserModel.find({ role: instructorRole?._id }).select({ _id: 1 });

    const ids = instructors.map((instuctor) => instuctor._id);

    res.status(200).json({ body: ids });
  } catch (error) {
    next(error);
  }
};

export const getSingleInstructor: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    const instructor = await UserModel.findById(id)
      .select("+ownCourses +avgRating")
      .populate({ path: "ownCourses", populate: "level" });
    if (!instructor) throw createHttpError(404, "Багш олдсонгүй.");

    res.status(200).json({ message: "Амжилттай", body: instructor });
  } catch (error) {
    next(error);
  }
};

//GET ALL INSTRUCTORS
export const getInstructors: RequestHandler = async (req, res, next) => {
  try {
    const { q: search = "", sort = "popular" } = req.query;

    let order = "";
    switch (sort) {
      case "newest":
        order = "-createdAt";
        break;
      case "nameAsc":
        order = "fullName";
        break;
      case "nameDesc":
        order = "-fullName";
        break;
      default:
        order = "-avgRating";
        break;
    }

    const users: IUser[] = await UserModel.find({
      $or: [
        { firstName: new RegExp("^" + search, "i") },
        { lastName: new RegExp("^" + search, "i") },
      ],
    })
      .select("+avgRating +ownCourses")
      .populate(["role", { path: "ownCourses", populate: ["instructor", "level"] }])
      .sort(order);

    const instructors = users.filter((user) => user.role.slug === "instructor");
    res.status(200).json({ message: "Амжилттай", body: instructors });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

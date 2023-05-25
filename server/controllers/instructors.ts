import { RequestHandler } from "express";
import { IUser } from "../models/user";
import UserModel from "../models/user";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import axios from "axios";
import env from "../configs/validateEnv";

export const becomeInstructor: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;

  try {
    await UserModel.findByIdAndUpdate(userId, {
      role: "Instructor",
    });

    await axios.get(`${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/`);
    await axios.get(
      `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/become-instructor`
    );
    await axios.get(
      `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET}&path=/about-us`
    );
    await axios.get(
      `${env.PUBLIC_SITE_URL}/api/revalidate?secret=${
        env.REVALIDATE_SECRET
      }&path=${`/instructors/${userId}`}`
    );

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const getAllInsturctorIds: RequestHandler = async (req, res, next) => {
  try {
    const instructors = await UserModel.find({
      role: "Instructor",
      "ownPublishedCourses.0": { $exists: true },
    }).select({ _id: 1 });

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
    .populate({ path: "ownPublishedCourses", populate: "level" });
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

    const instructors: IUser[] = await UserModel.find({
      role: "Instructor",
      $or: [
        { firstName: new RegExp("^" + search, "i") },
        { lastName: new RegExp("^" + search, "i") },
      ],
      "ownPublishedCourses.0": { $exists: true },
    })
      .select("+avgRating +studentCount +reviewCount")
      .sort(order);

    res.status(200).json({ message: "Амжилттай", body: instructors });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

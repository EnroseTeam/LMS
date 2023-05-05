import { RequestHandler } from "express";
import UserOrderModel from "../models/userOrder";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import CourseModel from "../models/course";
import { nanoid } from "nanoid";
//GET ALL ORDER

export const getUserOrders: RequestHandler = async (req, res, next) => {
  try {
    const orders = await UserOrderModel.find().populate(["course", "user"]);
    res.status(200).json({ message: "Амжилттай", body: orders });
  } catch (error) {
    next(error);
  }
};

//GET SINGLE ORDER BY ID
export const getSingleOrder: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "ID буруу байна.");
    const order = await UserOrderModel.findById(id).populate([
      "course",
      "user",
    ]);

    if (!order) throw createHttpError(404, "Захиалга олдсонгүй");

    res.status(200).json({ message: "Амжилттай", body: order });
  } catch (error) {
    next(error);
  }
};

//GET SINGLE USER'S ALL ORDER
export const getSingleUserOrder: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  try {
    const orders = await UserOrderModel.find({ user: userId }).populate([
      "course",
      "user",
    ]);
    if (!orders) throw createHttpError(404, "Захиалга олдсонгүй");
    res.status(200).json({ message: "Амжилттай", body: orders });
  } catch (error) {
    next(error);
  }
};

interface UserOrderBody {
  courses?: string[];
  status?: string;
}
//CREATE USER ORDER
export const createUserOrder: RequestHandler<
  unknown,
  unknown,
  UserOrderBody,
  unknown
> = async (req, res, next) => {
  const userId = req.session.userId;
  const { courses } = req.body;

  const session = await mongoose.startSession();
  try {
    if (!userId) throw createHttpError(400, "ID буруу байна.");
    if (!courses || courses.length === 0)
      throw createHttpError(400, "Сургалт байхгүй байна.");

    session.startTransaction();

    const isUserExist = await UserModel.findById(userId, null, { session });
    if (!isUserExist) throw createHttpError(404, "Хэрэглэгч олдсонгүй.");

    let totalAmount = 0;
    for (const course of courses) {
      const courseRes = await CourseModel.findById(course, null, { session });
      if (courseRes) {
        if (courseRes.discountPrice > 0) totalAmount += courseRes.discountPrice;
        else totalAmount += courseRes.price;
      }
    }

    const [newOrder] = await UserOrderModel.create([
      {
        orderNumber: nanoid().toUpperCase(),
        courses,
        totalAmount,
      },
      { session },
    ]);

    isUserExist.orders.push(newOrder._id);
    await isUserExist.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      message: `Захиалга амжилттай нэмэгдлээ`,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
  session.endSession();
};

interface UserOrderParams {
  id: string;
}
export const updateUserOrder: RequestHandler<
  UserOrderParams,
  unknown,
  UserOrderBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const session = await mongoose.startSession();
  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "ID буруу байна.");
    if (!status) throw createHttpError(400, "Статус шаардлагатай.");
    const updatedOrder = await UserOrderModel.findById(id);
  } catch (error) {
    next(error);
  }
};

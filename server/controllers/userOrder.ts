import { RequestHandler } from "express";
import UserOrderModel from "../models/userOrder";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import CourseModel from "../models/course";
import { customAlphabet } from "nanoid";
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
  const userId = req.session.userId;
  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "ID буруу байна.");
    const order = await UserOrderModel.findById(id).populate(["courses"]);

    if (!order) throw createHttpError(404, "Захиалга олдсонгүй");
    // if (order.user !== userId)
    //   throw createHttpError(403, "Танд энэ захиалгыг харах эрх байхгүй байна.");

    res.status(200).json({ message: "Амжилттай", body: order });
  } catch (error) {
    next(error);
  }
};

//GET SINGLE USER'S ALL ORDER
export const getSingleUserOrder: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  try {
    const orders = await UserOrderModel.find({ user: userId }).populate(["course", "user"]);
    if (!orders) throw createHttpError(404, "Захиалга олдсонгүй");
    res.status(200).json({ message: "Амжилттай", body: orders });
  } catch (error) {
    next(error);
  }
};

interface UserOrderBody {
  courses?: string[];
  status?: string;
  payerInformation?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: {
      apartment?: string;
      district?: string;
      city?: string;
      country?: string;
    };
  };
}
//CREATE USER ORDER
export const createUserOrder: RequestHandler<unknown, unknown, UserOrderBody, unknown> = async (
  req,
  res,
  next
) => {
  const userId = req.session.userId;
  const { courses, payerInformation } = req.body;

  const session = await mongoose.startSession();
  try {
    if (!userId) throw createHttpError(400, "ID буруу байна.");
    if (!courses || courses.length === 0) throw createHttpError(400, "Сургалт байхгүй байна.");
    if (!payerInformation)
      throw createHttpError(400, "Төлбөр төлөгчийн мэдээлэл заавал шаардлагатай.");
    if (!payerInformation.firstName)
      throw createHttpError(400, "Төлбөр төлөгчийн нэр заавал шаардлагатай.");
    if (!payerInformation.lastName)
      throw createHttpError(400, "Төлбөр төлөгчийн овог заавал шаардлагатай.");
    if (!payerInformation.email)
      throw createHttpError(400, "Төлбөр төлөгчийн и-мэйл заавал шаардлагатай.");
    if (!payerInformation.phone)
      throw createHttpError(400, "Төлбөр төлөгчийн утасны дугаар заавал шаардлагатай.");
    if (!payerInformation.address)
      throw createHttpError(400, "Төлбөр төлөгчийн хаяг заавал шаардлагатай.");
    if (!payerInformation.address.apartment)
      throw createHttpError(400, "Төлбөр төлөгчийн байр заавал шаардлагатай.");
    if (!payerInformation.address.district)
      throw createHttpError(400, "Төлбөр төлөгчийн дүүрэг заавал шаардлагатай.");
    if (!payerInformation.address.city)
      throw createHttpError(400, "Төлбөр төлөгчийн хот заавал шаардлагатай.");
    if (!payerInformation.address.country)
      throw createHttpError(400, "Төлбөр төлөгчийн улс заавал шаардлагатай.");

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

    const nanoid = customAlphabet("123456789abcdefghijklmopqrstuvwxyz", 12);
    const orderNumber = nanoid().toUpperCase();

    const [newOrder] = await UserOrderModel.create(
      [
        {
          orderNumber,
          courses,
          totalAmount,
          payerInformation,
          user: userId,
        },
      ],
      { session }
    );

    isUserExist.orders.push(newOrder._id);
    await isUserExist.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      message: `Захиалга амжилттай нэмэгдлээ`,
      body: newOrder._id,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
  session.endSession();
};

//UPDATE ORDER
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

  const session = await mongoose.startSession();
  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "ID буруу байна.");

    session.startTransaction();

    const order = await UserOrderModel.findById(id, null, { session });
    if (!order) throw createHttpError(404, "Захиалга олдсонгүй.");

    order.status = "Accepted";
    await order.save({ session });

    const user = await UserModel.findById(order.user, null, { session });
    if (!user) throw createHttpError(404, "Хэрэглэгч олдсонгүй.");

    order.courses.map((courseId) => {
      user.boughtCourses.push(courseId);
    });
    await user.save({ session });

    for (const courseId of order.courses) {
      const course = await CourseModel.findById(courseId, null, { session });
      if (course) {
        course.purchaseCount += 1;
        await course.save({ session });
      }
    }

    await session.commitTransaction();

    res.status(200).json({ message: "Амжилттай." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }

  session.endSession();
};

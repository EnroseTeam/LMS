import UserModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { RequestHandler } from "express";
import userRole from "../models/userRole";

interface UserBody {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  password?: string;
  role?: string;
}
interface UserParams {
  id: string;
}

//GET ALL USER
export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.find().populate("role");
    res.status(200).json({ message: "Амжилттай", body: users });
  } catch (error) {
    next(error);
  }
};

//GET SINGLE USER BY ID
export const getSingleUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Id буруу байна.");
    const user = await UserModel.findById(id).populate("role");
    if (!user) throw createHttpError(404, "Хэрэглэгч олдсонгүй.");

    res.status(200).json({ message: "Амжилттай", body: user });
  } catch (error) {
    next(error);
  }
};

//CREATE AN USER
export const createUser: RequestHandler<
  unknown,
  unknown,
  UserBody,
  unknown
> = async (req, res, next) => {
  const {
    firstName,
    lastName,
    birthDate,
    email,
    phone,
    address,
    avatar,
    password,
    role,
  } = req.body;
  try {
    if (!firstName)
      throw createHttpError(400, "Хэрэглэгчийн нэр заавал шаардлагатай.");

    if (!lastName)
      throw createHttpError(400, "Хэрэглэгчийн оврг заавал шаардлагатай.");

    if (!birthDate)
      throw createHttpError(
        400,
        "Хэрэглэгчийн төрсөн огноо заавал шаардлагатай."
      );

    if (!email)
      throw createHttpError(400, "Хэрэглэгчийн и-мэйл заавал шаардлагатай.");

    if (!phone)
      throw createHttpError(400, "Хэрэглэгчийн утас заавал шаардлагатай.");

    if (!password)
      throw createHttpError(400, "Хэрэглэгчийн нууц үг заавал шаардлагатай.");

    const isEmailExist = await UserModel.findOne({ email });

    if (isEmailExist)
      throw createHttpError(
        400,
        `${email} хаягтай хэрэглэгч бүртгэлтэй байна.`
      );

    const isPhoneExist = await UserModel.findOne({ phone });

    if (isPhoneExist)
      throw createHttpError(
        400,
        `${phone} утастай хэрэглэгч бүртгэлтэй байна.`
      );

    const newUser = await UserModel.create({
      firstName,
      lastName,
      birthDate,
      email,
      phone,
      address,
      avatar,
      password,
      role,
    });

    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", body: newUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//DELETE USER BY ID

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Id буруу байна.");

    const user = await UserModel.findById(id);

    if (!user) throw createHttpError(404, "Хэрэглэгч олдсонгүй");

    await user.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

//UPDATE AN USER BY ID

export const updateUser: RequestHandler<
  UserParams,
  unknown,
  UserBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    birthDate,
    email,
    phone,
    address,
    avatar,
    password,
    role,
  } = req.body;
  try {
    if (!firstName)
      throw createHttpError(400, "Хэрэглэгчийн нэр заавал шаардлагатай.");

    if (!lastName)
      throw createHttpError(400, "Хэрэглэгчийн оврг заавал шаардлагатай.");

    if (!birthDate)
      throw createHttpError(
        400,
        "Хэрэглэгчийн төрсөн огноо заавал шаардлагатай."
      );

    if (!email)
      throw createHttpError(400, "Хэрэглэгчийн и-мэйл заавал шаардлагатай.");

    if (!phone)
      throw createHttpError(400, "Хэрэглэгчийн утас заавал шаардлагатай.");

    if (!password)
      throw createHttpError(400, "Хэрэглэгчийн нууц үг заавал шаардлагатай.");

    const isEmailExist = await UserModel.findOne({ email, _id: { $ne: id } });

    if (isEmailExist)
      throw createHttpError(
        400,
        `${email} хаягтай хэрэглэгч бүртгэлтэй байна.`
      );

    const isPhoneExist = await UserModel.findOne({ phone, _id: { $ne: id } });

    if (isPhoneExist)
      throw createHttpError(
        400,
        `${phone} утастай хэрэглэгч бүртгэлтэй байна.`
      );

    const user = await UserModel.findById(id);

    if (!user) throw createHttpError(404, "Хэрэглэгч олдсонгүй.");

    await user.updateOne({
      firstName,
      lastName,
      birthDate,
      email,
      phone,
      address,
      avatar,
      password,
      role,
    });

    res.status(200).json({ message: "Амжилттай шинэчлэгдлээ." });
  } catch (error) {
    next(error);
  }
};

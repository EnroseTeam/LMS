import UserModel from "../models/user";
import createHttpError from "http-errors";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import UserRoleModel from "../models/userRole";

interface SignUpBody {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  password?: string;
  role?: string;
  socialAccounts?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  bio?: string;
}

interface LogInBody {
  email?: string;
  password?: string;
}

//CREATE AN USER
export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { firstName, lastName, email, phone, password: rawPassword } = req.body;
  try {
    if (!firstName)
      throw createHttpError(400, "Хэрэглэгчийн нэр заавал шаардлагатай.");
    if (!lastName)
      throw createHttpError(400, "Хэрэглэгчийн оврг заавал шаардлагатай.");
    if (!email)
      throw createHttpError(400, "Хэрэглэгчийн и-мэйл заавал шаардлагатай.");
    if (!phone)
      throw createHttpError(400, "Хэрэглэгчийн утас заавал шаардлагатай.");
    if (!rawPassword)
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

    const hashedPassword = await bcrypt.hash(rawPassword, 12);

    const studentRole = await UserRoleModel.findOne({ slug: "student" });

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: studentRole?._id,
    });

    req.session.userId = newUser._id;

    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", body: newUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logIn: RequestHandler<
  unknown,
  unknown,
  LogInBody,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email)
      throw createHttpError(400, "Нэвтрэхийн тулд и-мэйл заавал шаардлагатай.");
    if (!password)
      throw createHttpError(
        400,
        "Нэвтрэхийн тулд нууц үг заавал шаардлагатай."
      );

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user)
      throw createHttpError(400, "Таны оруулсан мэдээлэл буруу байна.");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw createHttpError(400, "Таны оруулсан мэдээлэл буруу байна.");

    req.session.userId = user._id;

    res.status(200).json({ message: "Амжилттай нэвтэрлээ", body: user });
  } catch (error) {
    next(error);
  }
};

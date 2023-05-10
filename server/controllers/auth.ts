import UserModel from "../models/user";
import createHttpError from "http-errors";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import UserRoleModel from "../models/userRole";
import { getGoogleAuthTokens, getGoogleUser } from "../services/google";

interface SignUpBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  rePassword?: string;
}

interface LogInBody {
  email?: string;
  password?: string;
  remember?: boolean;
}

// Get authenticated user info
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//CREATE AN USER
export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (
  req,
  res,
  next
) => {
  const { firstName, lastName, email, phone, password: rawPassword, rePassword } = req.body;
  try {
    if (!firstName) throw createHttpError(400, "Хэрэглэгчийн нэр заавал шаардлагатай.");
    if (!lastName) throw createHttpError(400, "Хэрэглэгчийн оврг заавал шаардлагатай.");
    if (!email) throw createHttpError(400, "Хэрэглэгчийн и-мэйл заавал шаардлагатай.");
    if (!phone) throw createHttpError(400, "Хэрэглэгчийн утас заавал шаардлагатай.");
    if (!rawPassword) throw createHttpError(400, "Хэрэглэгчийн нууц үг заавал шаардлагатай.");
    if (rawPassword !== rePassword) throw createHttpError(400, "Нууц үг таарахгүй байна.");

    const passwordChecker = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    if (!passwordChecker.test(rawPassword))
      throw createHttpError(400, "Нууц үг шаардлага хангахгүй байна.");

    const emailChecker = new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/gi, "gm");
    if (!emailChecker.test(email)) throw createHttpError(400, "И-мэйл хаяг буруу байна.");

    const phoneChecker = new RegExp("^[89]\\d{7}$");
    if (!phoneChecker.test(phone)) throw createHttpError(400, "Утасны дугаар буруу байна.");

    const isEmailExist = await UserModel.findOne({ email });
    if (isEmailExist) throw createHttpError(400, `${email} хаягтай хэрэглэгч бүртгэлтэй байна.`);

    const isPhoneExist = await UserModel.findOne({ phone });
    if (isPhoneExist) throw createHttpError(400, `${phone} утастай хэрэглэгч бүртгэлтэй байна.`);

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

    res.status(201).json({ message: "Амжилттай бүртгэгдлээ" });
  } catch (error) {
    next(error);
  }
};

export const logIn: RequestHandler<unknown, unknown, LogInBody, unknown> = async (
  req,
  res,
  next
) => {
  const { email, password, remember } = req.body;

  try {
    if (!email) throw createHttpError(400, "Нэвтрэхийн тулд и-мэйл заавал шаардлагатай.");
    if (!password) throw createHttpError(400, "Нэвтрэхийн тулд нууц үг заавал шаардлагатай.");

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) throw createHttpError(400, "Таны оруулсан мэдээлэл буруу байна.");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw createHttpError(400, "Таны оруулсан мэдээлэл буруу байна.");

    req.session.userId = user._id;
    if (remember) req.session.cookie.maxAge = 60 * 60 * 1000 * 24;

    res.status(200).json({ message: "Амжилттай нэвтэрлээ" });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) next(error);
    else res.sendStatus(200);
  });
};

export const googleOAuthHandler: RequestHandler = async (req, res, next) => {
  const code = req.query.code as string;

  try {
    const { id_token, access_token } = await getGoogleAuthTokens({ code });

    const googleUser = await getGoogleUser({ id_token, access_token });

    if (!googleUser.verified_email) {
      throw createHttpError(400, "Хэрэглэчийн и-мэйл баталгаажаагүй байна.");
    }

    const studentRole = await UserRoleModel.findOne({ slug: "student" });

    const user = await UserModel.findOneAndUpdate(
      { email: googleUser.email },
      {
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        fullName: googleUser.family_name + " " + googleUser.given_name,
        avatar: googleUser.picture,
        role: studentRole?._id,
      },
      {
        upsert: true,
        new: true,
      }
    );

    req.session.userId = user._id;

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

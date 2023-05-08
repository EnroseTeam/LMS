import UserModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { IUser } from "../models/user";
import UserRoleModel from "../models/userRole";

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

// Get authenticated user info
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId).populate([
      "role",
      { path: "boughtCourses", populate: ["instructor", "level"] },
      { path: "ownCourses", populate: ["instructor", "level"] },
      { path: "orders", populate: "courses" },
    ]);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

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
      .populate([
        "role",
        { path: "boughtCourses", populate: ["instructor", "level"] },
        { path: "ownCourses", populate: ["instructor", "level"] },
      ])
      .sort(order);

    const instructors = users.filter((user) => user.role.slug === "instructor");
    res.status(200).json({ message: "Амжилттай", body: instructors });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

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
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Id буруу байна.");

    const user = await UserModel.findById(id).populate([
      "role",
      { path: "boughtCourses", populate: ["instructor", "level"] },
      { path: "ownCourses", populate: ["instructor", "level"] },
    ]);
    if (!user) throw createHttpError(404, "Хэрэглэгч олдсонгүй.");

    res.status(200).json({ message: "Амжилттай", body: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserPersonalInfo: RequestHandler<unknown, unknown, UserBody, unknown> = async (
  req,
  res,
  next
) => {
  const userId = req.session.userId;
  const { firstName, lastName, birthDate, email, phone, address, avatar } = req.body;
  try {
    if (!firstName) throw createHttpError(400, "Хэрэглэгчийн нэр заавал шаардлагатай.");
    if (!lastName) throw createHttpError(400, "Хэрэглэгчийн оврг заавал шаардлагатай.");
    if (!birthDate) throw createHttpError(400, "Хэрэглэгчийн төрсөн огноо заавал шаардлагатай.");
    if (!email) throw createHttpError(400, "Хэрэглэгчийн и-мэйл заавал шаардлагатай.");
    if (!phone) throw createHttpError(400, "Хэрэглэгчийн утас заавал шаардлагатай.");

    const isEmailExist = await UserModel.findOne({
      email,
      _id: { $ne: userId },
    });
    if (isEmailExist) throw createHttpError(400, `${email} хаягтай хэрэглэгч бүртгэлтэй байна.`);

    const isPhoneExist = await UserModel.findOne({
      phone,
      _id: { $ne: userId },
    });
    if (isPhoneExist) throw createHttpError(400, `${phone} утастай хэрэглэгч бүртгэлтэй байна.`);

    const user = await UserModel.findById(userId);
    if (!user) throw createHttpError(404, "Хэрэглэгч олдсонгүй.");

    await user.updateOne({
      firstName,
      lastName,
      fullName: lastName + " " + firstName,
      birthDate,
      email,
      phone,
      address,
      avatar,
    });

    res.status(200).json({ message: "Хэрэглэгчийн хувийн мэдээлэл амжилттай шинэчлэгдлээ" });
  } catch (error) {
    next(error);
  }
};

interface UserPasswordBody {
  newPassword?: string;
  reNewPassword?: string;
  oldPassword?: string;
}

export const updateUserPassword: RequestHandler<
  unknown,
  unknown,
  UserPasswordBody,
  unknown
> = async (req, res, next) => {
  const userId = req.session.userId;
  const { newPassword, reNewPassword, oldPassword } = req.body;

  try {
    if (!mongoose.isValidObjectId(userId)) throw createHttpError(400, "Id буруу байна.");
    if (!newPassword) throw createHttpError(400, "Шинэ нууц үг шаардлагатай.");
    if (!reNewPassword) throw createHttpError(400, "Шинэ нууц үгээ давтаж оруулах шаардлагатай.");
    if (!oldPassword) throw createHttpError(400, "Хуучин нууц үг шаардлагатай.");
    if (newPassword !== reNewPassword)
      throw createHttpError(400, "Шинэ нууц үг давтан оруулсан нууц үгтэй таарахгүй байна.");

    const user = await UserModel.findById(userId).select("password");
    if (!user) throw createHttpError(404, "Хэрэглэгч олдсонгүй.");

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) throw createHttpError(400, "Хуучин нууц үг буруу байна.");

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({ message: "Нууц үг амжилттай шинэчлэгдлээ." });
  } catch (error) {
    next(error);
  }
};

interface UserSocialAccountsBody {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export const updateUserSocialAccounts: RequestHandler<
  unknown,
  unknown,
  UserSocialAccountsBody,
  unknown
> = async (req, res, next) => {
  const userId = req.session.userId;
  const { facebook, instagram, twitter, linkedin } = req.body;

  try {
    const urlChecker = new RegExp(
      "[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)"
    );

    if (!urlChecker.test(facebook as string) && facebook)
      throw createHttpError(400, "Фэйсбүүк хаяг буруу байна.");
    if (!urlChecker.test(instagram as string) && instagram)
      throw createHttpError(400, "Инстаграм хаяг буруу байна.");
    if (!urlChecker.test(twitter as string) && twitter)
      throw createHttpError(400, "Твиттер хаяг буруу байна.");
    if (!urlChecker.test(linkedin as string) && linkedin)
      throw createHttpError(400, "Линкэдин хаяг буруу байна.");

    const user = await UserModel.findById(userId);
    if (!user) throw createHttpError(400, "Хэрэглэгч олдсонгүй.");

    user.socialAccounts.facebook = facebook || "";
    user.socialAccounts.instagram = instagram || "";
    user.socialAccounts.twitter = twitter || "";
    user.socialAccounts.linkedin = linkedin || "";

    await user.save();

    res.status(200).json({ message: "Сошиол хаягууд амжилттай шинэчлэгдлээ." });
  } catch (error) {
    next(error);
  }
};

interface UserDeleteBody {
  password?: string;
}

export const deleteUser: RequestHandler<unknown, unknown, UserDeleteBody, unknown> = async (
  req,
  res,
  next
) => {
  const userId = req.session.userId;
  const { password } = req.body;

  try {
    // Хүсэлтээр ирсэн id зөв эсэхийг шалгана.
    if (!mongoose.isValidObjectId(userId)) throw createHttpError(400, "Id буруу байна.");
    if (!password) throw createHttpError(400, "Нууц үг заавал шаардлагатай.");

    // Хүсэлтээр орж ирсэн id-тай хэрэглэгч байгаа эсэхийг шалгана.
    const user = await UserModel.findById(userId).select("+password");
    if (!user) throw createHttpError(404, "Хэрэглэгч олдсонгүй");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw createHttpError(400, "Нууц үг буруу байна.");

    await user.deleteOne();

    req.session.destroy((error) => {
      if (error) next(error);
      else res.sendStatus(204);
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

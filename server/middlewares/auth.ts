import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";

export const authenticateUser: RequestHandler = (req, res, next) => {
  if (req.session.userId) next();
  else next(createHttpError(401, "Хэрэглэгч нэвтрээгүй байна."));
};

export const authorizeInstructor: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  const user = await UserModel.findById(userId).populate("role");

  if (user?.role.slug === "instructor") next();
  else next(createHttpError(403, "Таны эрх хүрэлцэхгүй байна."));
};

export const authorizeAdmin: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  const user = await UserModel.findById(userId).populate("role");

  if (user?.role.slug === "admin") next();
  else next(createHttpError(403, "Таны эрх хүрэлцэхгүй байна."));
};

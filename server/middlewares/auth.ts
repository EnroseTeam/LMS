import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";

export const authenticateUser: RequestHandler = (req, res, next) => {
  if (req.session.userId) next();
  else next(createHttpError(401, "Хэрэглэгч нэвтрээгүй байна."));
};

export const authorizeModerator: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;

  const user = await UserModel.findById(userId);

  if (user?.role === "Moderator" || user?.role === "Admin") next();
  else next(createHttpError(403, "Таны эрх хүрэлцэхгүй байна."));
};

export const authorizeInstructor: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;

  const user = await UserModel.findById(userId);

  if (user?.role === "Instructor" || user?.role === "Admin") next();
  else next(createHttpError(403, "Таны эрх хүрэлцэхгүй байна."));
};

export const authorizeAdmin: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  const user = await UserModel.findById(userId).populate("role");

  if (user?.role === "Admin") next();
  else next(createHttpError(403, "Таны эрх хүрэлцэхгүй байна."));
};

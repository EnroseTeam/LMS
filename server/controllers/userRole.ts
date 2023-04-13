import UserRoleModel from '../models/userRole';
import createHttpError from 'http-errors';
import slugify from 'slugify';
import mongoose from 'mongoose';
import { RequestHandler } from 'express';

interface UserRoleBody {
  role?: string;
}

interface UserRoleParams {
  id: string;
}

//GET ALL USER_ROLE
export const getUserRoles: RequestHandler = async (req, res, next) => {
  try {
    const userRoles = await UserRoleModel.find();
    res.status(200).json({ message: 'Амжилттай', body: userRoles });
  } catch (error) {
    next(error);
  }
};

//GET SINGLE USER_ROLE BY ID
export const getSingleUserRole: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Id буруу байна.');

    const userRole = await UserRoleModel.findById(id);
    if (!userRole) throw createHttpError(404, 'Role олдсонгүй.');

    res.status(200).json({ message: 'Амжилттай', body: userRole });
  } catch (error) {
    next(error);
  }
};

//CREATE AN USER_ROLE
export const createUserRole: RequestHandler<unknown, unknown, UserRoleBody, unknown> = async (
  req,
  res,
  next
) => {
  const { role } = req.body;

  try {
    if (!role) throw createHttpError(400, 'Нэр заавал шаардлагатай.');

    const slug = slugify(role).toLowerCase();
    const isSlugExist = await UserRoleModel.findOne({ slug });
    if (isSlugExist)
      throw createHttpError(400, `${role} нэртэй role бүртгэгдсэн байна. Өөр role сонгоно уу.`);

    const newUserRole = await UserRoleModel.create({
      role,
      slug,
    });

    res.status(201).json({
      message: `${role} нэртэй role амжилттай нэмэгдлээ`,
      body: newUserRole,
    });
  } catch (error) {
    next(error);
  }
};

//DELETE USER_ROLE BY ID
export const deleteUserRole: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Id буруу байна.');

    const userRole = await UserRoleModel.findById(id);

    if (!userRole) throw createHttpError(404, 'Role олдсонгүй');

    await userRole.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

//UPDATE USER_ROLE BY ID

export const updateUserRole: RequestHandler<
  UserRoleParams,
  unknown,
  UserRoleBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Id буруу байна.');

    if (!role) throw createHttpError(400, 'Role заавал шаардлагатай.');

    const slug = slugify(role).toLowerCase();

    const isSlugExist = await UserRoleModel.findOne({ slug, _id: { $ne: id } });

    if (isSlugExist)
      throw createHttpError(400, `${role} нэртэй role бүртгэгдсэн байна. Өөр нэр сонгоно уу.`);

    const userRole = await UserRoleModel.findById(id);
    if (!userRole) throw createHttpError(404, 'Role олдсонгүй');
    userRole.role = role;
    userRole.slug = slug;

    const editedUserRole = await userRole.save();

    res.status(200).json({
      message: `${role} нэртэй ролл амжилттай шинэчлэгдлээ.`,
      body: editedUserRole,
    });
  } catch (error) {
    next(error);
  }
};

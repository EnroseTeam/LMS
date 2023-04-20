import express from "express";
import {
  deleteUser,
  getInstructors,
  getSingleUser,
  getUsers,
  updateUser,
  updateUserPassword,
} from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/instructors", getInstructors);
userRouter.get("/", getUsers);
userRouter.get("/:id", getSingleUser);

userRouter.delete("/:id", deleteUser);

userRouter.patch("/:id", updateUser);
userRouter.patch("/:id/password", updateUserPassword);

export default userRouter;

import express from "express";
import {
  deleteUser,
  getAuthenticatedUser,
  getInstructors,
  getSingleUser,
  getUsers,
  updateUser,
  updateUserPassword,
} from "../controllers/user";
import { authenticateUser } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.get("/current", authenticateUser, getAuthenticatedUser);
userRouter.get("/instructors", getInstructors);
userRouter.get("/", getUsers);
userRouter.get("/:id", getSingleUser);

userRouter.delete("/:id", deleteUser);

userRouter.patch("/:id", updateUser);
userRouter.patch("/:id/password", updateUserPassword);

export default userRouter;

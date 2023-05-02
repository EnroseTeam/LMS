import express from "express";
import {
  becomeInstructor,
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

userRouter.post("/becomeInstructor", authenticateUser, becomeInstructor);

userRouter.delete("/:id", deleteUser);

userRouter.patch("/password", authenticateUser, updateUserPassword);
userRouter.patch("/:id", updateUser);

export default userRouter;

import express from "express";
import {
  becomeInstructor,
  deleteUser,
  getAuthenticatedUser,
  getInstructors,
  getSingleUser,
  getUsers,
  updateUserPersonalInfo,
  updateUserPassword,
  updateUserSocialAccounts,
} from "../controllers/user";
import { authenticateUser } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.get("/current", authenticateUser, getAuthenticatedUser);
userRouter.get("/instructors", getInstructors);
userRouter.get("/", getUsers);
userRouter.get("/:id", getSingleUser);

userRouter.post("/becomeInstructor", authenticateUser, becomeInstructor);

userRouter.patch("/password", authenticateUser, updateUserPassword);
userRouter.patch("/personal-info", authenticateUser, updateUserPersonalInfo);
userRouter.patch(
  "/social-accounts",
  authenticateUser,
  updateUserSocialAccounts
);

userRouter.delete("/delete-account", authenticateUser, deleteUser);

export default userRouter;

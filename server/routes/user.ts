import express from "express";
import {
  deleteUser,
  getSingleUser,
  getUsers,
  updateUserPersonalInfo,
  updateUserPassword,
  updateUserSocialAccounts,
} from "../controllers/user";
import { authenticateUser } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getSingleUser);

userRouter.patch("/password", authenticateUser, updateUserPassword);
userRouter.patch("/personal-info", authenticateUser, updateUserPersonalInfo);
userRouter.patch("/social-accounts", authenticateUser, updateUserSocialAccounts);

userRouter.delete("/delete-account", authenticateUser, deleteUser);

export default userRouter;

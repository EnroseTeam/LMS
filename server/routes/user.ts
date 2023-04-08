import express from "express";
import {
  createUser,
  deleteUser,
  getSingleUser,
  getUsers,
  updateUser,
} from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getSingleUser);

userRouter.post("/", createUser);

userRouter.delete("/:id", deleteUser);

userRouter.patch("/:id", updateUser);

export default userRouter;

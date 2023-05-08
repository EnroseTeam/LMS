import express from "express";
import {
  createUserOrder,
  getSingleOrder,
  getUserOrders,
  updateUserOrder,
} from "../controllers/userOrder";
import { authenticateUser } from "../middlewares/auth";

const userOrderRouter = express.Router();

userOrderRouter.get("/", getUserOrders);
userOrderRouter.get("/:id", getSingleOrder);

userOrderRouter.post("/", authenticateUser, createUserOrder);
userOrderRouter.patch("/:id", updateUserOrder);

export default userOrderRouter;

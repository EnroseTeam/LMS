import express from "express";
import {
  createUserRole,
  deleteUserRole,
  getSingleUserRole,
  getUserRoles,
  updateUserRole,
} from "../controllers/userRole";

const userRoleRouter = express.Router();

userRoleRouter.get("/", getUserRoles);

userRoleRouter.get("/:id", getSingleUserRole);

userRoleRouter.post("/", createUserRole);

userRoleRouter.delete("/:id", deleteUserRole);

userRoleRouter.patch("/:id", updateUserRole);

export default userRoleRouter;

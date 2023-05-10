import express from "express";
import {
  getAuthenticatedUser,
  googleOAuthHandler,
  logIn,
  logout,
  signUp,
} from "../controllers/auth";
import { authenticateUser } from "../middlewares/auth";

const authRoutes = express.Router();

authRoutes.get("/current", authenticateUser, getAuthenticatedUser);

authRoutes.post("/signup", signUp);
authRoutes.post("/login", logIn);
authRoutes.post("/logout", logout);

authRoutes.get("/google", googleOAuthHandler);

export default authRoutes;

import express from "express";
import { googleOAuthHandler, logIn, logout, signUp } from "../controllers/auth";

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", logIn);
authRoutes.post("/logout", logout);

authRoutes.get("/google", googleOAuthHandler);

export default authRoutes;

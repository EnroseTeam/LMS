import express from "express";
import { logIn, logout, signUp } from "../controllers/auth";

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", logIn);
authRoutes.post("/logout", logout);

export default authRoutes;

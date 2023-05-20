import express from "express";
import { authenticateUser, authorizeAdmin, authorizeInstructor } from "../middlewares/auth";
import {
  createCourseRequest,
  getAllCourseRequests,
  getSingleCourseRequest,
  updateCourseRequest,
} from "../controllers/courseRequest";

const courseRequestRouter = express.Router();

courseRequestRouter.get("/", authenticateUser, authorizeAdmin, getAllCourseRequests);
courseRequestRouter.get("/:id", authenticateUser, authorizeAdmin, getSingleCourseRequest);

courseRequestRouter.post("/", authenticateUser, authorizeInstructor, createCourseRequest);

courseRequestRouter.patch("/:id", authenticateUser, authorizeAdmin, updateCourseRequest);

export default courseRequestRouter;

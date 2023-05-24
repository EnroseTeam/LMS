import express from "express";
import { authenticateUser, authorizeAdmin, authorizeInstructor } from "../middlewares/auth";
import {
  createCourseRequest,
  getAllCourseRequests,
  getSingleCourseRequest,
  acceptCourseRequest,
  rejectCourseRequest,
} from "../controllers/courseRequest";

const courseRequestRouter = express.Router();

courseRequestRouter.get("/", authenticateUser, authorizeAdmin, getAllCourseRequests);
courseRequestRouter.get("/:id", authenticateUser, authorizeAdmin, getSingleCourseRequest);

courseRequestRouter.post("/", authenticateUser, authorizeInstructor, createCourseRequest);

courseRequestRouter.patch("/:id/accept", authenticateUser, authorizeAdmin, acceptCourseRequest);
courseRequestRouter.patch("/:id/reject", authenticateUser, authorizeAdmin, rejectCourseRequest);

export default courseRequestRouter;

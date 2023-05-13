import express from "express";
import {
  createCourseReview,
  deleteCourseReview,
  getCourseReviews,
  getReviewByInstructorId,
  getSingleCourseReview,
  updateCourseReview,
} from "../controllers/courseReview";
import { authenticateUser, authorizeInstructor } from "../middlewares/auth";

const courseReviewRouter = express.Router();

courseReviewRouter.get(
  "/instructor",
  authenticateUser,
  authorizeInstructor,
  getReviewByInstructorId
);

courseReviewRouter.get("/", getCourseReviews);

courseReviewRouter.get("/:id", getSingleCourseReview);

courseReviewRouter.post("/", authenticateUser, createCourseReview);

courseReviewRouter.delete("/:id", deleteCourseReview);

courseReviewRouter.patch("/:id", updateCourseReview);

export default courseReviewRouter;

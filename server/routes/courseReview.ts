import express from "express";
import {
  createCourseReview,
  deleteCourseReview,
  getCourseReviews,
  getSingleCourseReview,
  updateCourseReview,
} from "../controllers/courseReview";
import { authenticateUser } from "../middlewares/auth";

const courseReviewRouter = express.Router();

courseReviewRouter.get("/", getCourseReviews);

courseReviewRouter.get("/:id", getSingleCourseReview);

courseReviewRouter.post("/", authenticateUser, createCourseReview);

courseReviewRouter.delete("/:id", deleteCourseReview);

courseReviewRouter.patch("/:id", updateCourseReview);

export default courseReviewRouter;

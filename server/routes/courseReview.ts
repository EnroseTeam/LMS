import express from "express";
import {
  createCourseReview,
  deleteCourseReview,
  getCourseReviews,
  getSingleCourseReview,
  updateCourseReview,
} from "../controllers/courseReview";

const courseReviewRouter = express.Router();

courseReviewRouter.get("/", getCourseReviews);

courseReviewRouter.get("/:id", getSingleCourseReview);

courseReviewRouter.post("/", createCourseReview);

courseReviewRouter.delete("/:id", deleteCourseReview);

courseReviewRouter.patch("/:id", updateCourseReview);

export default courseReviewRouter;

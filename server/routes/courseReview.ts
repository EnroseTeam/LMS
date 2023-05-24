import express from "express";
import {
  createCourseReview,
  deleteCourseReview,
  getCourseReviews,
  getReviewByInstructorId,
  getSingleCourseReview,
  getTestimonials,
  makeTestimonial,
  removeTestimonial,
  updateCourseReview,
} from "../controllers/courseReview";
import { authenticateUser, authorizeAdmin, authorizeInstructor } from "../middlewares/auth";

const courseReviewRouter = express.Router();

courseReviewRouter.get(
  "/instructor",
  authenticateUser,
  authorizeInstructor,
  getReviewByInstructorId
);

courseReviewRouter.get("/testimonials", getTestimonials);

courseReviewRouter.get("/", getCourseReviews);

courseReviewRouter.get("/:id", getSingleCourseReview);

courseReviewRouter.post("/", authenticateUser, createCourseReview);

courseReviewRouter.delete("/:id", deleteCourseReview);

courseReviewRouter.patch("/:id", updateCourseReview);

courseReviewRouter.patch("/:id/show", authenticateUser, authorizeAdmin, makeTestimonial);

courseReviewRouter.patch("/:id/remove", authenticateUser, authorizeAdmin, removeTestimonial);

export default courseReviewRouter;

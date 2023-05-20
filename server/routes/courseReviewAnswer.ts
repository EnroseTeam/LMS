import express from "express";
import {
  createCourseReviewAnswer,
  deleteCourseReviewAnswer,
  getSingleCourseReviewAnswer,
  updateCourseReviewAnswer,
} from "../controllers/courseReviewAnswer";
import { authenticateUser, authorizeInstructor } from "../middlewares/auth";

const courseReviewAnswerRouter = express.Router();

courseReviewAnswerRouter.get("/:id", getSingleCourseReviewAnswer);

courseReviewAnswerRouter.post("/", authenticateUser, authorizeInstructor, createCourseReviewAnswer);

courseReviewAnswerRouter.patch(
  "/:id",
  authenticateUser,
  authorizeInstructor,
  updateCourseReviewAnswer
);

courseReviewAnswerRouter.delete(
  "/:id",
  authenticateUser,
  authorizeInstructor,
  deleteCourseReviewAnswer
);

export default courseReviewAnswerRouter;

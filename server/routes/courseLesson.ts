import express from "express";
import {
  createCourseLesson,
  deleteCourseLesson,
  getCourseLessons,
  getLessonIds,
  getSingleCourseLesson,
  updateCourseLesson,
} from "../controllers/courseLesson";
import { authenticateUser, authorizeInstructor } from "../middlewares/auth";

const courseLessonRouter = express.Router();

courseLessonRouter.get("/ids", getLessonIds);
courseLessonRouter.get("/", getCourseLessons);
courseLessonRouter.get("/:id", authenticateUser, getSingleCourseLesson);

courseLessonRouter.post("/", authenticateUser, authorizeInstructor, createCourseLesson);

courseLessonRouter.patch("/:id", authenticateUser, authorizeInstructor, updateCourseLesson);

courseLessonRouter.delete("/:id", authenticateUser, authorizeInstructor, deleteCourseLesson);

export default courseLessonRouter;

import express from "express";
import {
  createCourseLesson,
  deleteCourseLesson,
  getCourseLessons,
  getLessonIds,
  getSingleCourseLesson,
  updateCourseLesson,
} from "../controllers/courseLesson";
import { authenticateUser } from "../middlewares/auth";

const courseLessonRouter = express.Router();

courseLessonRouter.get("/ids", getLessonIds);
courseLessonRouter.get("/", getCourseLessons);
courseLessonRouter.get("/:id", authenticateUser, getSingleCourseLesson);

courseLessonRouter.post("/", createCourseLesson);

courseLessonRouter.patch("/:id", updateCourseLesson);

courseLessonRouter.delete("/:id", deleteCourseLesson);

export default courseLessonRouter;

import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourseCounts,
  getCourseIds,
  getCourses,
  getSingleCourse,
  updateCourse,
} from "../controllers/course";
import { authenticateUser, authorizeInstructor } from "../middlewares/auth";

const courseRouter = express.Router();

courseRouter.get("/counts", getCourseCounts);
courseRouter.get("/id", getCourseIds);

courseRouter.get("/", getCourses);
courseRouter.get("/:id", getSingleCourse);

courseRouter.post("/", authenticateUser, authorizeInstructor, createCourse);

courseRouter.patch("/:id", updateCourse);

courseRouter.delete("/:id", deleteCourse);

export default courseRouter;

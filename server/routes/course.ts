import express from "express";
import {
  addMediaToCourse,
  createCourse,
  deleteCourse,
  getCourseByInstructorId,
  getCourseByUserId,
  getCourseCounts,
  getPublishedCourseIds,
  getAllCourseIds,
  getCourses,
  getSingleCourse,
  updateCourse,
} from "../controllers/course";
import { authenticateUser, authorizeAdmin, authorizeInstructor } from "../middlewares/auth";

const courseRouter = express.Router();

courseRouter.get("/counts", getCourseCounts);
courseRouter.get("/publishedIds", getPublishedCourseIds);
courseRouter.get("/allIds", getAllCourseIds);
courseRouter.get("/user", authenticateUser, getCourseByUserId);
courseRouter.get("/instructor", authenticateUser, authorizeInstructor, getCourseByInstructorId);

courseRouter.get("/", getCourses);
courseRouter.get("/:id", getSingleCourse);

courseRouter.post("/", authenticateUser, authorizeInstructor, createCourse);

courseRouter.patch("/:id", authenticateUser, authorizeInstructor, updateCourse);
courseRouter.patch("/:id/media", authenticateUser, authorizeInstructor, addMediaToCourse);

courseRouter.delete("/:id", authenticateUser, authorizeAdmin, deleteCourse);

export default courseRouter;

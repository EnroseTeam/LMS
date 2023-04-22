import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourseCounts,
  getCourses,
  getSingleCourse,
  updateCourse,
} from "../controllers/course";

const courseRouter = express.Router();

courseRouter.get("/counts", getCourseCounts);

courseRouter.get("/", getCourses);
courseRouter.get("/:id", getSingleCourse);

courseRouter.post("/", createCourse);

courseRouter.patch("/:id", updateCourse);

courseRouter.delete("/:id", deleteCourse);

export default courseRouter;

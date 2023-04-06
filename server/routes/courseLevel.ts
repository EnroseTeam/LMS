import express from "express";
import {
  getCourseLevels,
  getSingleCourseLevel,
  createCourseLevel,
  deleteCourseLevel,
  updateCourseLevel,
} from "../controllers/courseLevel";

const courseLevelRouter = express.Router();

courseLevelRouter.get("/", getCourseLevels);

courseLevelRouter.get("/:id", getSingleCourseLevel);

courseLevelRouter.post("/", createCourseLevel);

courseLevelRouter.delete("/:id", deleteCourseLevel);

courseLevelRouter.patch("/:id", updateCourseLevel);

export default courseLevelRouter;

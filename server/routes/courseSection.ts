import express from "express";
import {
  createCourseSection,
  deleteCourseSection,
  getCourseSetions,
  getSingleCourseSection,
  updateCourseSection,
} from "../controllers/courseSection";
import { authenticateUser, authorizeInstructor } from "../middlewares/auth";

const courseSectionRouter = express.Router();

courseSectionRouter.get("/", getCourseSetions);
courseSectionRouter.get("/:id", getSingleCourseSection);

courseSectionRouter.post("/", authenticateUser, authorizeInstructor, createCourseSection);

courseSectionRouter.patch("/:id", authenticateUser, authorizeInstructor, updateCourseSection);

courseSectionRouter.delete("/:id", authenticateUser, authorizeInstructor, deleteCourseSection);

export default courseSectionRouter;

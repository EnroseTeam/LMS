import express from "express";
import {
  createCourseCategory,
  deleteCourseCategory,
  getAllCourseCategoriesId,
  getCourseCategories,
  getSingleCourseCategory,
  updateCourseCategory,
} from "../controllers/courseCategory";
import { authenticateUser, authorizeAdmin } from "../middlewares/auth";

const courseCategoryRouter = express.Router();

courseCategoryRouter.get("/id", getAllCourseCategoriesId);

courseCategoryRouter.get("/", getCourseCategories);
courseCategoryRouter.get("/:id", getSingleCourseCategory);

courseCategoryRouter.post("/", authenticateUser, authorizeAdmin, createCourseCategory);

courseCategoryRouter.patch("/:id", authenticateUser, authorizeAdmin, updateCourseCategory);

courseCategoryRouter.delete("/:id", authenticateUser, authorizeAdmin, deleteCourseCategory);

export default courseCategoryRouter;

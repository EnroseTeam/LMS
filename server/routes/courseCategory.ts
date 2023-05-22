import express from "express";
import {
  createCourseCategory,
  deleteCourseCategory,
  getAllCourseCategoriesId,
  getCourseCategories,
  getSingleCourseCategory,
  updateCourseCategory,
} from "../controllers/courseCategory";

const courseCategoryRouter = express.Router();

courseCategoryRouter.get("/id", getAllCourseCategoriesId);

courseCategoryRouter.get("/", getCourseCategories);
courseCategoryRouter.get("/:id", getSingleCourseCategory);

courseCategoryRouter.post("/", createCourseCategory);

courseCategoryRouter.patch("/:id", updateCourseCategory);

courseCategoryRouter.delete("/:id", deleteCourseCategory);

export default courseCategoryRouter;

import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogId,
  getBlogs,
  getSingleBlog,
  updateBlog,
} from "../controllers/blog";
import { authenticateUser, authorizeAdmin } from "../middlewares/auth";

const blogRouter = express.Router();

//Routers

blogRouter.get("/id", getAllBlogId);

blogRouter.get("/", getBlogs);

blogRouter.get("/:id", getSingleBlog);

blogRouter.post("/", authenticateUser, authorizeAdmin, createBlog);

blogRouter.delete("/:id", deleteBlog);

blogRouter.patch("/:id", updateBlog);

export default blogRouter;

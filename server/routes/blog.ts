import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogId,
  getBlogs,
  getSingleBlog,
  updateBlog,
} from "../controllers/blog";
import { authenticateUser, authorizeModerator } from "../middlewares/auth";

const blogRouter = express.Router();

//Routers

blogRouter.get("/id", getAllBlogId);

blogRouter.get("/", getBlogs);

blogRouter.get("/:id", getSingleBlog);

blogRouter.post("/", authenticateUser, authorizeModerator, createBlog);

blogRouter.delete("/:id", authenticateUser, authorizeModerator, deleteBlog);

blogRouter.patch("/:id", authenticateUser, authorizeModerator, updateBlog);

export default blogRouter;

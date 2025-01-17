import { Router } from "express";
const router = Router();
import {
  getBlogs,
  postBlogs,
  getBlogSingle,
  editBlog,
  deleteBlog,
} from "../controllers/blogControllers";

router.get("/blogs", getBlogs);
router.post("/blogs", postBlogs);
router.get("/blogs/:id", getBlogSingle);
router.put("/blogs/:id", editBlog);
router.delete("/blogs/:id", deleteBlog);

export { router };

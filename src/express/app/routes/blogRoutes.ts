import { Router } from "express";
const router = Router();
import {
  getBlog,
  postBlog,
  getBlogSingle,
  editBlog,
  deleteBlog,
} from "../controllers/blogControllers";

import { getUserAuthentication } from "../middleware/authorization";

router.get("/blogs", getUserAuthentication, getBlog);
router.post("/blogs", getUserAuthentication, postBlog);
router.get("/blogs/:id", getUserAuthentication, getBlogSingle);
router.put("/blogs/:id", getUserAuthentication, editBlog);
router.delete("/blogs/:id", getUserAuthentication, deleteBlog);

export { router };

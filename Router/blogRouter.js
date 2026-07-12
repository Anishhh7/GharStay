import express from "express";
import * as BlogController from "./../controller/blogController.js";
import permission from "../Config/permission.js";
permission;
import * as AuthController from "./../controller/authController.js";

const router = express.Router()

router.route("/").get(BlogController.getAllBlogs);
router.route("/:id").get(BlogController.getBlog);

router.use(AuthController.protect);

router
  .route("/")
  .post(AuthController.restrictTo(...permission.blog.create), BlogController.createBlog);

router
  .route("/:id")
  .patch(AuthController.restrictTo(...permission.blog.update), BlogController.updateBlog)
  .delete(AuthController.restrictTo(...permission.blog.delete), BlogController.deleteBlog);

export default router;
import express from "express";
import permission from "../Config/permission.js";
import * as AuthController from "../controller/authController.js";
import * as TestimonialController from "../controller/testmonialController.js";

const router = express.Router();

router
 .route("/")
 .get(TestimonialController.getActiveTestimonials)
 .post(TestimonialController.createTestimonial);

router.use(AuthController.protect);

router
 .route("/all")
 .get(
  AuthController.restrictTo(...permission.testimonial.readAll),
  TestimonialController.getAllTestimonials
 );

router
 .route("/:id")
 .patch(
  AuthController.restrictTo(...permission.testimonial.update),
  TestimonialController.updateTestimonial
 )
 .delete(
  AuthController.restrictTo(...permission.testimonial.delete),
  TestimonialController.deleteTestimonial
 );

export default router;
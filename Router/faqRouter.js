import express from "express";
import permission from "../Config/permission.js";
import * as AuthController from "../controller/authController.js";
import * as FaqController from "../controller/faqController.js";

const router = express.Router();

router.route("/").get(FaqController.getAllFaqs);

router.use(AuthController.protect);

router
 .route("/")
 .post(AuthController.restrictTo(...permission.faq.create), FaqController.createFaq);

router
 .route("/:id")
 .patch(AuthController.restrictTo(...permission.faq.update), FaqController.updateFaq)
  .delete(AuthController.restrictTo(...permission.faq.delete), FaqController.deleteFaq);
 

export default router;

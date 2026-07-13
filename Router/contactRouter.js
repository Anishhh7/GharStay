import express from "express";
import permission from "../Config/permission.js";
import * as AuthController from "../controller/authController.js";
import * as ContactController from "../controller/contactController.js";

const router = express.Router();

router.route("/").post(ContactController.createContact);

router.use(AuthController.protect);

router
 .route("/")
 .get(AuthController.restrictTo(...permission.contact.readAll), ContactController.getAllContacts);

router
 .route("/:id")
 .delete(
  AuthController.restrictTo(...permission.contact.delete),
  ContactController.deleteContact
 );

export default router;

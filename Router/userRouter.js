const express = require("express");
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");
const model = require("mongoose");

const router = express.Router();

router.post("/login", authController.logIn);

router.use(authController.protect);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route("/:id").get(userController.updateUser);

module.exports = router;

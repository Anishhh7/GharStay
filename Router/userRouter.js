const express = require("express");
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");
const model = require("mongoose");

const router = express.Router();

router.post("/login", authController.logIn);

router.use(authController.protect);

router.post('/createuser',userController.createUser)
router
  .route("/")
  .get(userController.getAllUsers)

router.route("/:id").get(userController.updateUser);

module.exports = router;

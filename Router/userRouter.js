const express = require("express");
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");

const router = express.Router();

router.post("/login", authController.logIn);

router.use(authController.protect);
router.use(authController.restrictTo("superAdmin"));

router.route("/").get(userController.getAllUsers);

router.post("/createuser", userController.createUser);

router.post("/createuser/bulk", userController.createManyUsers);

router.route("/:id").get(userController.updateUser);

module.exports = router;

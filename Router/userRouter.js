import express from 'express';
import * as userController from './../controller/userController.js';
import * as authController from './../controller/authController.js'
import permission from '../Config/permission.js';

const router = express.Router();

router.post("/login", authController.logIn);

router.use(authController.protect);
router.use(authController.restrictTo(...permission.users.create));

router.route("/").get(userController.getAllUsers);

router.post("/createuser", userController.createUser);

router.post("/createuser/bulk", userController.createManyUsers);

router.route("/:id").patch(userController.updateUser);

export default router;

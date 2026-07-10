const express = require("express");
const menuController = require("./../controller/menuController");
const authController = require("./../controller/authController");
const permission = require("./../Config/permission");

const router = express.Router();

router.route("/").get(menuController.getAllMenu);

router.route("/:id").get(menuController.getMenu);

router.use(authController.protect);

router
    .route("/")
    .post(
        authController.restrictTo(...permission.menu.create),
        menuController.createMenu
    );
router
    .route("/bulk")
    .post(
        authController.restrictTo(...permission.menu.create),
        menuController.createManyMenu
    );

router
  .route("/:id")
  .patch(
    authController.restrictTo(...permission.menu.update),
    menuController.updateMenu
  )
  .delete(
    authController.restrictTo(...permission.menu.delete),
    menuController.deleteMenu
  );

module.exports = router;

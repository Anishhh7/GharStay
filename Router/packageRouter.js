const express = require("express");
const PackageController = require("./../controller/packageController");
const authController = require("./../controller/authController");
const permission = require("./../Config/permission");

const router = express.Router();

router.route("/").get(PackageController.getAllPackages);
router.route("/:id").get(PackageController.getPackage);

router.use(authController.protect);

router
  .route("/").post(
    authController.restrictTo(...permission.packages.create),
    PackageController.createPackage
  )
  router.route('/bulk').post(
    authController.restrictTo(...permission.packages.create),
    PackageController.createManyPackages
  );

router
  .route("/:id")
  .patch(
    authController.restrictTo(...permission.packages.update),
    PackageController.updatePackage
  )
  .delete(
    authController.restrictTo(...permission.packages.delete),
    PackageController.deletePackage
  );

module.exports = router;

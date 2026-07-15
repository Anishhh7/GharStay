import express from 'express';
import * as PackageController from './../controller/packageController.js';
import * as authController from './../controller/authController.js';
import permission from './../Config/permission.js';
import upload from '../utils/mediaUpload.js';

const router = express.Router();

router.route('/').get(PackageController.getAllPackages);
router.route('/:id').get(PackageController.getPackage);

router.use(authController.protect);

router
  .route('/')
  .post(
    authController.restrictTo(...permission.packages.create),
    upload.single('image'),
    PackageController.createPackage
  );

router
  .route('/:id')
  .patch(
    authController.restrictTo(...permission.packages.update),
    PackageController.updatePackage
  )
  .delete(
    authController.restrictTo(...permission.packages.delete),
    PackageController.deletePackage
  );

export default router;

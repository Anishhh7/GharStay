import express from 'express';
import * as menuController from './../controller/menuController.js';
import * as authController from './../controller/authController.js';
import permission from './../Config/permission.js';
import upload from '../utils/mediaUpload.js';

const router = express.Router();

router.route('/').get(menuController.getAllMenu);

router.route('/:id').get(menuController.getMenu);

router.use(authController.protect);

router
  .route('/')
  .post(
    authController.restrictTo(...permission.menu.create),
    upload.single('image'),
    menuController.createMenu
  );

router
  .route('/:id')
  .patch(
    authController.restrictTo(...permission.menu.update),
    menuController.updateMenu
  )
  .delete(
    authController.restrictTo(...permission.menu.delete),
    menuController.deleteMenu
  );

export default router;

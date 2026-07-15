import express from 'express';
import permission from '../Config/permission.js';
import * as GalleryController from './../controller/galleryController.js';
import * as AuthController from './../controller/authController.js';
import upload from '../utils/mediaUpload.js';

const router = express.Router();

router.route('/').get(GalleryController.getAllGalleryItem);
router.route('/:id').get(GalleryController.getGalleryItem);

router.use(AuthController.protect);

router
  .route('/')
  .post(
    AuthController.restrictTo(...permission.gallery.create),
    GalleryController.createGalleryItem
  );

router
  .route('/:id')
  .patch(
    AuthController.restrictTo(...permission.gallery.update),
    GalleryController.updateGalleryItems
  )
  .delete(
    AuthController.restrictTo(...permission.gallery.delete),
    GalleryController.deleteGalleryItem
  );

export default router;

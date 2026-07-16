import express from 'express';
import permission from '../Config/permission.js';

import * as AuthController from '../controller/authController.js';
import * as WebsiteController from '../controller/websiteController.js';
import upload from '../utils/mediaUpload.js';

const router = express.Router();

router.route('/').get(WebsiteController.getWebsite);

router.use(AuthController.protect);

router.route('/').patch(
  AuthController.restrictTo(...permission.website.update),
  upload.fields([
    { name: 'logo', maxcount: 1 },
    { name: 'bannerImages', maxCount: 3 },
  ]),
  WebsiteController.updateWebsite
);

export default router;

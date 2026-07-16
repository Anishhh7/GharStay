import express from 'express';
import permission from '../Config/permission.js';

import * as AuthController from '../controller/authController.js';
import * as NewsLetterController from '../controller/newLetterController.js';

const router = express.Router();

router.route('/').post(NewsLetterController.createSubscriber);

router.use(AuthController.protect);

router.use(AuthController.restrictTo(...permission.newsletter.readAll));

router.route('/').get(NewsLetterController.getAllSubscribers);


export default router;
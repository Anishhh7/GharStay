import express from 'express';
import permission from '../Config/permission.js';
import * as AuthController from '../controller/authController.js';
import * as AiChatController from '../controller/aiChatController.js';

const router = express.Router();

router.route('/bot').post(AiChatController.askAssitant);

router.use(AuthController.protect);

router
  .route('/')
  .get(
    AuthController.restrictTo(...permission.aibot.readAll),
    AiChatController.getAllChat
  )
  .post(
    AuthController.restrictTo(...permission.aibot.create),
    AiChatController.createChat
  );

router
  .route('/:id')
  .patch(
    AuthController.restrictTo(...permission.aibot.update),
    AiChatController.updateChat
  );


export default router;
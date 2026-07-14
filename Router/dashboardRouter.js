import express from 'express';
import * as DashboardController from '../controller/dashboardController.js';
import permission from '../Config/permission.js';
import * as AuthController from '../controller/authController.js';

const router = express.Router();

router
  .route('/')
  .get(
    AuthController.protect,
    AuthController.restrictTo(...permission.dashboard.readAll),
    DashboardController.getDashboardStats
  );

export default router;

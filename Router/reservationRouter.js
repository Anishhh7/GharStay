import express from 'express';
import permission from '../Config/permission.js';
import * as Authcontroller from '../controller/authController.js';
import * as ReserverController from '../controller/reservationController.js';

const router = express.Router();

router.route('/').post(ReserverController.createReservation);

router.use(Authcontroller.protect);

router
  .route('/')
  .get(
    Authcontroller.restrictTo(...permission.reservation.readAll),
    ReserverController.getAllReservations
  );

router
  .route('/:id/status')
  .patch(
    Authcontroller.restrictTo(...permission.reservation.update),
    ReserverController.updateStatusReservation
  );

router
  .route('/:id')
  .get(
    Authcontroller.restrictTo(...permission.reservation.readAll),
    ReserverController.getReservation
  )
  .patch(
    Authcontroller.restrictTo(...permission.reservation.updateAll),
    ReserverController.updateReservationDetails
  )

  .delete(
    Authcontroller.restrictTo(...permission.reservation.delete),
    ReserverController.deleteReservation
  );

export default router;

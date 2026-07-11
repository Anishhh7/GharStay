import express from 'express';
import * as RoomController from './../controller/roomController.js';
import * as authController from './../controller/authController.js'
import permission from './../Config/permission.js';

const router = express.Router();

router.route("/").get(RoomController.getAllRooms);
router.route("/:id").get(RoomController.getRoom);

router.use(authController.protect);

router
  .route("/")
  .post(
    authController.restrictTo(...permission.rooms.create),
    RoomController.createRoom
);
  

router
  .route("/:id")
  .patch(
    authController.restrictTo(...permission.rooms.update),
    RoomController.updateRoom
  )
  .delete(
    authController.restrictTo(...permission.rooms.delete),
    RoomController.deleteRoom
  );

export default router;
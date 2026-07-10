const express = require("express");
const RoomController = require("./../controller/roomController");
const authController = require("./../controller/authController");
const permission = require("./../Config/permission");

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

module.exports = router;
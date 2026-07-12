import express from "express";
import permission from "../Config/permission.js";
import * as EventController from "./../controller/eventController.js";
import * as Authcontroller from "./../controller/authController.js";

const router = express.Router();

router.route("/").get(EventController.getAllEvents);
router.route("/:id").get(EventController.getEvent);

router.use(Authcontroller.protect);

router
  .route("/")
  .post(Authcontroller.restrictTo(...permission.events.create), EventController.createEvent);

router
  .route("/:id")
  .patch(Authcontroller.restrictTo(...permission.events.update), EventController.updateEvent)
  .delete(
    Authcontroller.restrictTo(...permission.events.delete),
    EventController.deleteEvents
  );

export default router;
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Reservation from '../models/reservationModel.js';
import Room from '../models/roomModel.js';
import Package from '../models/pacakageModel.js';
import Testimonial from '../models/testimonialsModel.js';
import Contact from '../models/contactModel.js';
import { getAllRooms } from './roomController.js';
import { getAllReservations } from './reservationController.js';
import { getAllPackages } from './packageController.js';
import { getAllTestimonials } from './testmonialController.js';
import { getAllContacts } from './contactController.js';

export const getDashboardStats = catchAsync(async (req, res, next) => {
  const [
    totalReservations,
    pendingReservations,
    totalRooms,
    totalPackages,
    pendingTestimonials,
    totalContacts,
  ] = await Promise.all([
    Reservation.countDocuments({ reservation: getAllReservations }),
    Reservation.countDocuments({
      reservation: getAllReservations,
      status: 'Pending',
    }),
    Room.countDocuments({ room: getAllRooms }),
    Package.countDocuments({ pkgs: getAllPackages }),
    Testimonial.countDocuments({
      testimonal: getAllTestimonials,
      approved: false,
    }),
    Contact.countDocuments({ contact: getAllContacts }),
  ]);
  sendResponse(res, 200, {
    totalReservations,
    pendingReservations,
    totalRooms,
    totalPackages,
    pendingTestimonials,
    totalContacts,
  });
});

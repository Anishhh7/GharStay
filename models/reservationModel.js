import { globalTimestampFormatter } from '../utils/mongoosePlugins.js';
import mongoose from 'mongoose';
import validator from 'validator';

const reservationSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },

  customerName: {
    type: String,
    required: true,
  },

  customerEmail: {
    type: String,
    validate: [validator.isEmail, 'Please enter a valid email'],
    required: true,
  },

  customerNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\+[1-9]\d{7,14}$/.test(value);
      },
      message: 'Please enter a valid mobile number start with country code',
    },
  },

  numberOfGuests: {
    type: Number,
    required: true,
  },

  checkedIn: {
    type: Date,
    required: true,
  },

  checkedOut: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    enum: ['pending', 'approved', 'cancelled', 'completed'],
    default: 'Pending',
  },

  remarks: {
    type: String,
  },
}, {
  timestamps:true
});

reservationSchema.plugin(globalTimestampFormatter);

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model('Reservation', reservationSchema);

export default Reservation;

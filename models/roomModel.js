
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true
  },
  roomType: {
    type: String,
    required: true,
    enum: ["Single", "Double", "Deluxe"]
  },
  description: {
    type: String,
    required: true
  },

  amenities: {
    type: [String]
  },

  features: {
    type: [String]
  },

  price: {
    type: Number,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  occupancy: {
    type: Number,
    required: true,
    min: 1
  },

  images: {
    type: [String]
  },

  featured: {
    type: Boolean,
    default: false
  }
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

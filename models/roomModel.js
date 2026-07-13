import mongoose from "mongoose";

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
},
 {
    timestamps:true
});

const Room = mongoose.models.Room|| mongoose.model("Room", roomSchema);

export default Room;

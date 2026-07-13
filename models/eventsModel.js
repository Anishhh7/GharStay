import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    date: {
      type: Date,
      required: true
    },
    category: {
      type: String,
      enum: [
        "Weddings",
        "Corporate Events",
        "Birthday",
        "Family Gatherings",
        "Cultural Programs"
      ],
      required: true
    },
    image: {
      type: Array
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timeStamps: true
  }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;

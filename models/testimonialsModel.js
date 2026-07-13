import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot higher than 5"],
    required: true
  },
  message: {
      type: String,
      trim: true,
      maxLength:[400, "Message cannot be longer than 400 characters"]
  },

  approved: {
    type: Boolean,
    default: false
    },
},
    {
    timestamps:true
});

const Testimonial =
  mongoose.models.Testimonial ||
    mongoose.model("Testimonial", testimonialSchema);
  

export default Testimonial;

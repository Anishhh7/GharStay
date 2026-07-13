import mongoose from "mongoose";
import validator from "validator";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Invalid email address"]
  },
  phone: {
    type: String,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Phone number must be exactly 10 digits"
    }
  },
  message: {
    type: String,
    trim: true,
    maxLength: [500, "Message cannot be longer than 500 characters"]
  }
},
{
timestamps:true
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;

import validator from 'validator';
import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  includedServices: {
    type: [String]
  },
  price: {
    type: Number,
    required: true
  },
  termsAndCondition: {
    type: [String]
  },
  images: {
    type: [String]
  },
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
},
 {
    timestamps:true
});

const Package = mongoose.models.Package|| mongoose.model("Package", packageSchema);
export default Package;

import validator from 'validator';
import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: [
      "Nepali Cuisine",
      "Local Special",
      "Beverages",
      "Dessserts",
      "Snacks",
      "Breakfast"
    ]
  },

  image: {
    type: [String]
  },
  veg: {
    type: Boolean,
    default: false
  },
  popular: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
  }
});

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;

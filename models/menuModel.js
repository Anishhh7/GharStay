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

  images: {
    type: String
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
},
 {
    timestamps:true
});

const Menu = mongoose.models.Menu|| mongoose.model("Menu", menuSchema);
export default Menu;

import mongoose from 'mongoose';
import validator from 'validator'

const newsLetterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email address'],
  },
},{
timestamps:true
});

const News = mongoose.models.News || mongoose.model('News', newsLetterSchema);

export default News;



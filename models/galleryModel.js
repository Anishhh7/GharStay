import mongoose from "mongoose";
import validator from 'validator';

const gallerySchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    mediaType: {

        type: String,
        enum: ['Image', 'Video'],
        required: true
    },
    url: {
        type: String,
        validate:[validator.isURL, 'Invalid Url'],
        required: true
    },
    category: {
        type: String,
        enum: ['Rooms', 'Restaurant', 'Nature', 'Swimming Pool', 'Events', 'Resort Activities']
    },
    featured: {
        type: Boolean,
        default: false
    }
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
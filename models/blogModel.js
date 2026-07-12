import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Travel', 'Resort', 'Food', 'Events', 'Others'],
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    coverImage: {
        type: String
    },
    published: {
        type: Boolean,
        default: false
    },
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String
    },

});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
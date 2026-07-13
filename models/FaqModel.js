import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true,
        trim: true,
        maxLength:[130, "Questions cannot be longer than 130 characters"]
    },
    answer: {
        type: String,
        required: true,
        trim: true,
        maxLength:[800, "Answer cannot be longer than 800 characters"]
    },
    category: {
        type: String
    }

},
    {
        timestamps: true
    });


const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', faqSchema);

export default FAQ;
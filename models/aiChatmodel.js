import mongoose from 'mongoose';

const chatbotSchema = new mongoose.Schema({
    question: {
        type: String,
    },
    
    answer: {
        type: String,
        required: true
    },
    keywords: {
        type: [String]
    },

    category: {
        type: String
    }

},{
timestamps:true
});

const AiChat = mongoose.models.AiChat || mongoose.model('AiChat', chatbotSchema);

export default AiChat;

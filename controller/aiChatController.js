import AiChat from '../models/aiChatmodel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import ApiFeatures from '../utils/apiFeatures.js';
import askGemini from '../utils/Gemini-ask.js';
import Room from '../models/roomModel.js';

export const createChat = catchAsync(async (req, res, next) => {
  const chat = await AiChat.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: { chat },
    message: 'Successfully created!!',
  });
});

export const askAssitant = catchAsync(async (req, res, next) => {
  const{ message}  = req.body;

    const enteries = await AiChat.find();
    
    

  const match = enteries.find((entry) => {
    return entry.keywords.some((keyword) => message.toLowerCase().includes(keyword.toLowerCase())
  )
  });

  if (match) {
    return res.status(200).json({
      status: 'success',
      data: { answer: match.answer },
    });
  }

  if (message.match == Room) {
    
  }
   
  
  res.status(200).json({
    status: 'sucess',
    data: {
      answer: 'Sorry, I could not find an answer. Please contact us directly.',
    },
  });
});

export const getAllChat = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(AiChat.find(), req.query)
    .filter()
    .search()
    .sort()
    .pagination();

  const chat = await features.query;

  res.status(200).json({
    status: 'success',
    results: chat.length,
    page: features.page,
    limit: features.limit,
    data: { chat },
  });
});

export const updateChat = catchAsync(async (req, res, next) => {
  const chat = await AiChat.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!chat) {
    return next(new AppError('unable to find', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { chat },
    message: 'updated sucessfully',
  });
});

import AiChat from '../models/aiChatmodel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import ApiFeatures from '../utils/apiFeatures.js';
import getGeminiAnswer from '../utils/getGeminiAnswer.js';
import sendResponse from '../utils/sendResponse.js';

export const createChat = catchAsync(async (req, res, next) => {
  const chat = await AiChat.create(req.body);

  sendResponse(res, 201, chat, 'message created successfully');
});

export const askAssitant = catchAsync(async (req, res, next) => {
  const { message } = req.body;

  const entries = await AiChat.find();

  const match = entries.find((entry) =>
    entry.keywords.some((keyword) =>
      message.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  if (match) {
    return sendResponse(res, 200, { answer: match.answer });
  }

  const answer = await getGeminiAnswer(message);
  sendResponse(res, 200, answer);
});

export const getAllChat = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(AiChat.find(), req.query)
    .filter()
    .search()
    .sort()
    .pagination();

  const chat = await features.query;

  sendResponse(res, 200, chat, undefined, {
    results: chat.length,
    page: features.page,
    limit: features.limit,
  });
});

export const getChat = catchAsync(async (req, res, next) => {
  const chat = await AiChat.findById(req.params.id);

  if (!chat) {
    return next(new AppError('No Chat found with that ID'));
  }

  sendResponse(res, 200, chat);
});

export const updateChat = catchAsync(async (req, res, next) => {
  const chat = await AiChat.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!chat) {
    return next(new AppError('No Chat found with that ID'));
  }
  sendResponse(res, 200, chat, 'Chat response updated successfully ');
});


export const deleteChat = catchAsync(async (req, res, next) => {
  const chat = await AiChat.findByIdAndDelete(req.params.id);

  if (!chat) {
    return next(new AppError('No Chat found with that ID'));
  }
  sendResponse(res, 204, null, 'Chat response deleted successfully');
});

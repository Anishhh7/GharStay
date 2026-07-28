import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config({ path: './Config/config.env', quiet: true });
import cors from 'cors';
import globalErrorHandler from './controller/errorController.js';
import AppError from './utils/appError.js';
import userRouter from './Router/userRouter.js';
import roomRouter from './Router/roomRouter.js';
import packageRouter from './Router/packageRouter.js';
import menuRouter from './Router/menuRouter.js';
import blogRouter from './Router/blogRouter.js';
import eventRouter from './Router/eventRouter.js';
import galleryRouter from './Router/galleryRouter.js';
import contactRouter from './Router/contactRouter.js';
import faqRouter from './Router/faqRouter.js';
import tesimonialRouter from './Router/tesimonialRouter.js';
import reservationRouter from './Router/reservationRouter.js';
import dashboardRouter from './Router/dashboardRouter.js';
import newsLetterRouter from './Router/newLetterRouter.js';
import websiteRouter from './Router/websiteRouter.js';
import chatbotRouter from './Router/chatbotRouter.js';

const app = express();
app.set('query parser', 'extended');

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Dynamic CORS configuration for Vercel & local development
const allowedOrigins = [
  "http://localhost:5173",
  "https://ghar-stay-bi34qyiw3-anishhh7s-projects.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin || 
        allowedOrigins.includes(origin) || 
        origin.endsWith('.vercel.app') // Allows all Vercel previews/production URLs
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// API Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/packages', packageRouter);
app.use('/api/v1/menu-item', menuRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/gallery', galleryRouter);
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/faqs', faqRouter);
app.use('/api/v1/testimonials', tesimonialRouter);
app.use('/api/v1/reservation', reservationRouter);
app.use('/api/v1/dashboards', dashboardRouter);
app.use('/api/v1/subscribers', newsLetterRouter);
app.use('/api/v1/website', websiteRouter);
app.use('/api/v1/assitant', chatbotRouter);

// Default Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'GharStay API is live and running!'
  });
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.all('/{*path}', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
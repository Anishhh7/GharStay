import express from "express";
import morgan from "morgan";
import globalErrorHandler from "./controller/errorController.js";
import AppError from "./utils/appError.js";
import userRouter from "./Router/userRouter.js";
import roomRouter from "./Router/roomRouter.js";
import packageRouter from "./Router/packageRouter.js";
import menuRouter from "./Router/menuRouter.js";
import blogRouter from "./Router/blogRouter.js";
import eventRouter from "./Router/eventRouter.js";
import galleryRouter from "./Router/galleryRouter.js";
import contactRouter from "./Router/contactRouter.js";
import faqRouter from "./Router/faqRouter.js";
import tesimonialRouter from "./Router/tesimonialRouter.js";

const app = express();
app.set("query parser", "extended");

app.use(express.json());

app.use((req, res, next) => {
 next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/packages", packageRouter);
app.use("/api/v1/menu-item", menuRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/gallery", galleryRouter);
app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/faqs", faqRouter);
app.use("/api/v1/testimonials", tesimonialRouter);

app.all("/{*path}", (req, res, next) => {
 next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;

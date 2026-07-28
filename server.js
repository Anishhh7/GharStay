import dotenv from "dotenv";

// Catch synchronous errors
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION!");
  console.error(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./Config/config.env" , quiet:true });
dotenv.config({ path: "./Config/cloudinary.env" , quiet:true });

import mongoose from "mongoose";
import { globalTimestampFormatter } from "./utils/mongoosePlugins.js";

mongoose.plugin(globalTimestampFormatter);

const { default: app } = await import("./app.js");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("MongoDB connected"));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server connected at ${port}!!!`);
});

// Catch unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥");
  console.error(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
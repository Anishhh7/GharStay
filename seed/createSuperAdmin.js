import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: './Config/config.env' })
import User from './../models/userModel.js'

const User = require("./../models/userModel");
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => console.log("mongoose connected"));

(async () => {
  await User.create({
    name: "Admin",
    email: "admin@gharstay.com",
    password: "passlogin123",
    role: "superAdmin",
  });

  console.log("SuperAdmin created");
  process.exit();
})
();
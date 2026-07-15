import dotenv from 'dotenv'
dotenv.config({ path: "./Config/config.env" });
dotenv.config({ path: './Config/cloudinary.env' });

import mongoose from 'mongoose';
import { globalTimestampFormatter } from './utils/mongoosePlugins.js';

mongoose.plugin(globalTimestampFormatter);

const {default:app} = await import('./app.js');



const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => console.log("mongoose connected"));


const port = (process.env.PORT = process.env.port || 3000)
app.listen(port, () => {
    console.log(`server connected!! at ${port}`);
})
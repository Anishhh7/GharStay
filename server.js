const dotenv = require('dotenv');
const mongoose = require("mongoose");
dotenv.config({ path: "./Config/config.env" });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => console.log("mongoose connected"));

const port = (process.env.PORT = process.env.port || 3000)
app.listen(port, () => {
    console.log(`server connected!! at ${port}`);
})
require("dotenv").config();
const mongoose = require("mongoose");
const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.22yof.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

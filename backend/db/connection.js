require("dotenv").config();
const mongoose = require("mongoose");
const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.71yhk.mongodb.net/?retryWrites=true&w=majority/process.env.DB_NAME`;
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const mongoose = require("mongoose");
const url ='mongodb+srv://deathsurgeon:Password1!@cluster0.s5guj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

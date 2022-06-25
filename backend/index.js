const express = require("express");
const cors = require("cors");
require("./db/connection.js");

const app = express();

app.use(cors());
app.use(express.json({ limit: "500mb" }));

app.get("/", (req, res) => {
  res.send("Working");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

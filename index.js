const express = require("express");
const cors = require("cors");
require("./db/connection.js");
const authRouter = require("./routers/auth.js");
const userRouter = require("./routers/users.js");
const app = express();
const httpServer = require("http").createServer(app);
const options = {};
const io = require("socket.io")(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"]
  }
});

io.on("connection", socket => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("sendMessage", (args) => {
    console.log(args);
    socket.broadcast.emit("receivedMessage", args);
  });
});

httpServer.listen(8080);
const messageRouter = require("./routers/messages.js");

app.use(cors());
app.use(express.json({ limit: "500mb" }));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/messages", messageRouter);

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

module.exports = app;

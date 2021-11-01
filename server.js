const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const tasksRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_DB;
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("DB connected..."));

app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);

// This middleware informs the express application to serve our compiled React files
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Catch any bad requests
app.get("*", (req, res) => {
  res.status(200).json({
    msg: "Catch All",
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

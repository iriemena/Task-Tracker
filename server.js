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

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

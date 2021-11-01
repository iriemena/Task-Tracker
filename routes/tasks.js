const express = require("express");
const Task = require("../models/task.model");
const router = express.Router();

router.get("/", (req, res) => {
  Task.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const tasks = {
    username: req.body.username,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date,
  };
  const newTask = new Task(tasks);
  newTask
    .save()
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted..."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.put("/update/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      task.username = req.body.username;
      task.description = req.body.description;
      task.duration = req.body.duration;
      task.date = req.body.date;
      console.log(task);
      task
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

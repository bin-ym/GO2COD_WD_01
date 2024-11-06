const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// POST: Add a new task
router.post('/tasks', async (req, res) => {
  try {
    const { task, dateTime } = req.body;
    const newTask = new Task({
      task,
      dateTime: new Date(dateTime),  // Make sure to convert date string to Date object
    });
    await newTask.save();
    res.status(201).json(newTask);  // Return the saved task
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

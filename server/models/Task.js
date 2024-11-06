const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Task', taskSchema);

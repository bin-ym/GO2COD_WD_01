const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors()); // Enable CORS for the frontend

mongoose.connect('mongodb://localhost:27017/task_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Task schema
const taskSchema = new mongoose.Schema({
  task: String,
  date: String, // Storing only the date
});

const Task = mongoose.model('Task', taskSchema);

// Fetch all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  const { task, date } = req.body;
  const newTask = new Task({ task, date });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task' });
  }
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
  const { task, date } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { task, date }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

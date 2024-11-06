import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Footer from "./Footer";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add new task
  const addTask = async (e) => {
    e.preventDefault();

    if (!taskText || !taskDate) {
      alert("Please enter both task and date.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        task: taskText,
        date: taskDate,
      });
      setTasks([...tasks, response.data]);
      setTaskText("");
      setTaskDate("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Edit task
  const editTask = (id) => {
    const task = tasks.find((task) => task._id === id);
    setTaskText(task.task);
    setTaskDate(task.date);
    setIsEditing(true);
    setEditTaskId(id);
    setShowModal(true);
  };

  // Update task
  const updateTask = async (e) => {
    e.preventDefault();

    if (!taskText || !taskDate) {
      alert("Please enter both task and date.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${editTaskId}`,
        {
          task: taskText,
          date: taskDate,
        }
      );
      const updatedTasks = tasks.map((task) =>
        task._id === editTaskId ? response.data : task
      );
      setTasks(updatedTasks);
      setTaskText("");
      setTaskDate("");
      setIsEditing(false);
      setEditTaskId(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Get today's date in yyyy-mm-dd format
  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Add margin-top and margin-bottom to the content wrapper */}
      <div className="flex-grow mt-8 mb-8"> {/* Adjusted margin-top and margin-bottom */}
        <h1 className="text-4xl font-semibold mb-6 text-center text-indigo-600">
          Task Manager
        </h1>
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg mx-auto">
          <form onSubmit={isEditing ? updateTask : addTask} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Task"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                min={todayDate} // This ensures the user can't select a date before today
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md focus:outline-none hover:bg-indigo-700 transition duration-300"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>

        {/* Task List */}
        <ul className="mt-6 w-full max-w-md space-y-4 mx-auto">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg"
            >
              <div>
                <h2 className="text-lg font-semibold">{task.task}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(task.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => editTask(task._id)}
                  className="text-indigo-600 hover:text-indigo-800 transition duration-200"
                >
                  <FaEdit className="text-xl" />
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-600 hover:text-red-800 transition duration-200"
                >
                  <FaTrashAlt className="text-xl" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for editing */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            <form onSubmit={updateTask} className="space-y-4">
              <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Task"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                min={todayDate} // Ensures the user can't select a date before today
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer /> {/* Add the Footer here */}
    </div>
  );
}

export default App;

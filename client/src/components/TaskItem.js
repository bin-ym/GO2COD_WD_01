import React, { useState } from 'react';

const TaskItem = ({ task, deleteTask, updateTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);

    const handleSave = () => {
        updateTask(task._id, { title, completed: task.completed });
        setIsEditing(false);
    };

    return (
        <div className="flex items-center mb-2">
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 flex-grow"
                />
            ) : (
                <span className="flex-grow">{task.title}</span>
            )}
            <button onClick={() => setIsEditing(!isEditing)} className="bg-yellow-500 text-white px-4 py-1 mx-1">
                {isEditing ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white px-4 py-1">
                Delete
            </button>
        </div>
    );
};

export default TaskItem;

import { useState } from "react";

export default function TaskAdd({ onTaskAdd, onInputChange }) {
    const [isAdding, setIsAdding] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', text: '' });

    const handleInputChangeInternal = (name, value) => {
        setNewTask(prevTask => ({ ...prevTask, [name]: value }));
        onInputChange(name, value);
    };

    const handleAddTask = () => {
        if (newTask.title.trim()) {
            onTaskAdd();
            setIsAdding(false);
            setNewTask({ title: '', text: '' });
        } else {
            alert('Please enter a title for the task.');
        }
    };

    const handleStartAdding = () => {
        setIsAdding(true);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && isAdding) {
            handleAddTask();
        }
    };

    const handleCancelAdd = () => {
        setIsAdding(false);
        setNewTask({ title: '', text: '' });
    };

    return (
        <div>
            {!isAdding ? (
                <button onClick={handleStartAdding}>Add New Task</button>
            ) : (
                <>
                    <input
                        type="text"
                        name="title"
                        value={newTask.title}
                        onChange={(e) => handleInputChangeInternal(e.target.name, e.target.value)}
                        placeholder="Enter task title..."
                        onKeyDown={handleKeyDown}
                    />
                    <textarea
                        name="text"
                        value={newTask.text}
                        onChange={(e) => handleInputChangeInternal(e.target.name, e.target.value)}
                        placeholder="Enter task description..."
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleAddTask}>Add Task</button>
                    <button onClick={handleCancelAdd}>Cancel</button>
                </>
            )}
        </div>
    );
}
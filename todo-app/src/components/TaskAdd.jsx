import { useState } from "react";

export default function TaskAdd({ taskText, onTaskAdd, onInputChange }) {
    const handleAddTask = () => {
        if (taskText.trim()) {
            onTaskAdd(taskText);
        }
    };

    return (
        <>
            <input
                type="text"
                value={taskText}
                onChange={onInputChange}
                placeholder="Enter task..."
            />
            <button onClick={handleAddTask}>Add Task</button>
        </>
    );
}
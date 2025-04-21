import React from 'react';
import axios from 'axios';
import Task from './Task';



export default function TaskList({ tasks, deleteTask, toggleComplete, apiUrl, setTasks }) {

    const handleTaskUpdatedInList = async (updatedTask) => {
        try {
            await axios.put(`${apiUrl}tasks/${updatedTask.id}`, updatedTask);
            console.log("Task updated!");
            setTasks(tasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            ));
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };




    return (
        <section>
            {tasks.map(task => (
                <Task
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleComplete={toggleComplete}
                    onTaskUpdated={handleTaskUpdatedInList} 
                />
            ))}
        </section>
    );
}
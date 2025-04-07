import React from 'react';
import Task from './Task';

export default function TaskList({ tasks, deleteTask, toggleComplete }) {
    return (
        <div>
            {tasks.map(task => (
                <Task
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleComplete={toggleComplete}
                />
            ))}
        </div>
    );
}
import React from 'react';
import { Link } from 'react-router-dom';

export default function Task({ task, deleteTask, toggleComplete }) {
    return (
        <article>
            <h3>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none', marginLeft: '8px' }}>
                    {task.title}
                </span>
            </h3>
            <p style={{ marginLeft: '24px' }}>{task.text}</p>
            <div>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <Link to={`/edit/${task.id}`}>Edit</Link>
            </div>
        </article>
    );
}
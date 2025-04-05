import React from 'react';
import { Link } from 'react-router-dom';

export default function Task({ task, deleteTask }) {
    return (
        <li>
            {task.text}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <Link to={`/edit/${task.id}`}>Edit</Link>
        </li>
    );
}
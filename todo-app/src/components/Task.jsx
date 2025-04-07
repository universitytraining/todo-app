import React, { useState } from 'react';
import '../styles/Task.css';

export default function Task({ task, deleteTask, toggleComplete, onTaskUpdated }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editText, setEditText] = useState(task.text);

    const handleTitleClick = () => {
        setIsEditing(true);
    };

    const handleDescriptionClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'editTitle') {
            setEditTitle(value);
        } else if (name === 'editText') {
            setEditText(value);
        }
    };

    const handleSave = () => {
        if (onTaskUpdated) {
            onTaskUpdated({ ...task, title: editTitle, text: editText });
            setIsEditing(false);
        } else {
            console.warn("onTaskUpdated prop not received by Task component.");
        }
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setEditText(task.text);
        setIsEditing(false);
    };

    return (
        <article>
            <h3>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                />
                {isEditing ? (
                    <input
                        type="text"
                        name="editTitle"
                        value={editTitle}
                        onChange={handleInputChange}
                        onBlur={handleSave}
                    />
                ) : (
                    <span
                        style={{ textDecoration: task.completed ? 'line-through' : 'none', marginLeft: '8px', cursor: 'pointer' }}
                        onClick={handleTitleClick}
                    >
                        {task.title}
                    </span>
                )}
            </h3>
            {isEditing ? (
                <textarea
                    name="editText"
                    value={editText}
                    onChange={handleInputChange}
                    onBlur={handleSave}
                />
            ) : (
                <p style={{ cursor: 'pointer' }} onClick={handleDescriptionClick}>{task.text}</p>
            )}
            <div className='taskDiv'>
                {isEditing && (
                    <>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </>
                )}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
        </article>
    );
}
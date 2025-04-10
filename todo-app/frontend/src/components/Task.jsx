import React, { useState } from 'react';
import '../styles/Task.css';

export default function Task({ task, deleteTask, toggleComplete, onTaskUpdated }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editText, setEditText] = useState(task.text);
    const [titleError, setTitleError] = useState(''); 


    const viewDescription = (event) => {
        const clickedViewBtn = event.target;
        const taskBtnDiv = clickedViewBtn.closest(".taskBtnDiv");

        if (!taskBtnDiv) {
            console.error("Could not find .taskBtnDiv ancestor.");
            return;
        }

        const taskHeader = taskBtnDiv.parentNode;
        const description = taskHeader ? taskHeader.nextElementSibling : null;

        const viewBtn = taskBtnDiv.querySelector(".viewBtn");

        if (description && viewBtn && description.classList.contains("descriptionP")) {
            if (description.classList.contains("opened")) {
                description.classList.remove("opened");
                viewBtn.textContent = "View";
            } else {
                description.classList.add("opened");
                viewBtn.textContent = "Hide";
            }
        } else {
            console.error("Could not find the description element.");
        }
    };


    const handleTitleClick = () => {
        setIsEditing(true);
        setTitleError(''); 
    };

    const handleDescriptionClick = () => {
        setIsEditing(true);
        setTitleError(''); 
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
        if (!editTitle.trim()) {
            setTitleError('Title is required!');
            return; 
        }

        setTitleError(''); 

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
        setTitleError(''); 
    };

    return (
        <article className="taskItem">
            <div className="taskHeader">
                <h3>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task)}
                    />
                    {isEditing ? (
                        <>
                            <input
                                maxLength="50"
                                type="text"
                                name="editTitle"
                                value={editTitle}
                                onChange={handleInputChange}
                            />
                            {titleError && <p className="error-message">{titleError}</p>} 
                        </>
                    ) : (
                        <span
                            className="taskTitle"
                            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                            onClick={handleTitleClick}
                        >
                            {task.title}
                        </span>
                    )}
                </h3>
                <div className='taskBtnDiv'>
                    {isEditing && (
                        <>
                            <button className='saveTaskBtn' onClick={handleSave}>Save</button>
                            <button className='cancelTaskBtn' onClick={handleCancel}>Cancel</button>
                        </>
                    )}
                    {!isEditing && (
                        <>
                            <button className='viewBtn' onClick={viewDescription}>View</button>
                            <button className='deleteBtn' onClick={() => deleteTask(task.id)}>Delete</button>
                        </>
                    )}
                </div>
            </div>
            {isEditing ? (
                <textarea
                    name="editText"
                    value={editText}
                    onChange={handleInputChange}
                />
            ) : (
                <p className='descriptionP' onClick={handleDescriptionClick}>
                    {task.text}
                </p>
            )}
        </article>
    );
}
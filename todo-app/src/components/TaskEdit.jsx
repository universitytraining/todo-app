import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TaskEdit({ onTaskUpdated, loggedInUserId }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const apiUrl = "http://127.0.0.1:8787/";
    const [task, setTask] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editText, setEditText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${apiUrl}tasks/${id}`);
                setTask(response.data);
                setEditTitle(response.data.title);
                setEditText(response.data.text);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching task:", err);
                setError('Failed to load task for editing.');
                setLoading(false);
            }
        };

        fetchTask();
    }, [apiUrl, id]);

    const handleSave = async () => {
        try {
            await axios.put(`${apiUrl}tasks/${id}`, { ...task, title: editTitle, text: editText });
            console.log("Task updated!");
            onTaskUpdated(loggedInUserId);
            navigate('/');
        } catch (err) {
            console.error("Error updating task:", err);
            setError('Failed to update task.');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleTitleChange = (event) => {
        setEditTitle(event.target.value);
    };

    const handleTextChange = (event) => {
        setEditText(event.target.value);
    };

    if (loading) {
        return <p>Loading task for editing...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!task) {
        return <p>Task not found.</p>;
    }

    return (
        <div>
            <h2>Edit Task</h2>
            <div>
                <label htmlFor="edit-title">Title:</label>
                <input
                    type="text"
                    id="edit-title"
                    value={editTitle}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                <label htmlFor="edit-text">Description:</label>
                <textarea
                    id="edit-text"
                    value={editText}
                    onChange={handleTextChange}
                />
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}
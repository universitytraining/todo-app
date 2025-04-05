import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TaskEdit({ onTaskUpdated }) { // Receive the prop
    const { id } = useParams();
    const navigate = useNavigate();
    const apiUrl = "http://127.0.0.1:8787/";
    const [task, setTask] = useState(null);
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
            await axios.put(`${apiUrl}tasks/${id}`, { ...task, text: editText });
            console.log("Task updated successfully!");
            onTaskUpdated();
            navigate('/');
        } catch (err) {
            console.error("Error updating task:", err);
            setError('Failed to update task.');
        }
    };

    const handleCancel = () => {
        navigate('/');
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
            <input
                type="text"
                value={editText}
                onChange={handleTextChange}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}
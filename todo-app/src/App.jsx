import './styles/App.css';
import { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { v4 as uuid } from "uuid";
import TaskAdd from './components/TaskAdd';
import TaskList from './components/TaskList';
import TaskEdit from './components/TaskEdit';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function App() {
    const apiUrl = "http://127.0.0.1:8787/";
    const [tasks, setTasks] = useState([]);


    const taskFetch = useCallback(async () => {
        try {
            const res = await axios.get(apiUrl + 'tasks');
            console.log("Server Data successfully fetched!");
            setTasks(res.data);
        } catch (err) {
            console.error("Err fetching:", err);
        }
    }, [apiUrl]);

    useEffect(() => {
        taskFetch();
    }, [taskFetch]);

    const addTaskHandle = async (text) => {
        try {
            const newTask = { id: uuid(), text: text, completed: false, userId: 1 };
            const res = await axios.post(apiUrl + 'tasks', newTask);
            console.log("Task successfully added to server!");
            setTasks([...tasks, res.data]);
            clearTaskInput();
        } catch (err) {
            console.error("Err adding task:", err);
        }
    };

    const [taskText, setTaskText] = useState('');
    const handleInputChange = (event) => {
        setTaskText(event.target.value);
    };
    const clearTaskInput = () => {
        setTaskText('');
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(apiUrl + `tasks/${taskId}`);
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (err) {
            console.error("Err deleting task:", err);
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <h1>My Task List</h1>
                            <TaskList tasks={tasks} deleteTask={deleteTask} />
                            <TaskAdd
                                taskText={taskText}
                                onTaskAdd={addTaskHandle}
                                onInputChange={handleInputChange}
                            />
                        </>
                    }
                />
                <Route path="/edit/:id" element={<TaskEdit onTaskUpdated={taskFetch} />} />
            </Routes>
        </BrowserRouter>
    );
}
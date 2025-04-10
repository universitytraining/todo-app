import "./styles/App.css";
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuid } from "uuid";
import TaskAdd from './components/TaskAdd';
import TaskList from './components/TaskList';
import Register from './components/Register';
import Login from './components/Login';
import NavBar from './components/NavBar'
import axios from 'axios';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

export default function App() {
    const apiUrlDev = "http://127.0.0.1:8787/";
    const apiUrlProd = "https://tasklist-vdgm.onrender.com/";
    const apiUrl = process.env.NODE_ENV === 'production' ? apiUrlProd : apiUrlDev;
    const [tasks, setTasks] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const [newTaskToAdd, setNewTaskToAdd] = useState({ title: '', text: '' });

    const fetchTasks = useCallback(async (userId) => {
        console.log("fetchTasks called for user:", userId);
        try {
            const res = await axios.get(`${apiUrl}tasks?userId=${userId}`);
            console.log("Data fetched for user:", userId);
            setTasks([...res.data]);
        } catch (err) {
            console.error("Err fetching tasks:", err);
        }
    }, [apiUrl]);

    const fetchUserEmail = useCallback(async (userId) => {
        if (userId) {
            try {
                const res = await axios.get(`${apiUrl}users/${userId}`);
                setUserEmail(res.data.email || '');
            } catch (error) {
                console.error('Error fetching user email:', error);
            }
        }
    }, [apiUrl]);

    const fetchUserName = useCallback(async (userId) => {
        if (userId) {
            try {
                const res = await axios.get(`${apiUrl}users/${userId}`);
                setUserName(res.data.username || '');
            } catch (error) {
                console.error('Error fetching user email:', error);
            }
        }
    }, [apiUrl]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');

        if (token && storedUserId) {
            setIsLoggedIn(true);
            setLoggedInUserId(storedUserId);
            fetchTasks(storedUserId);
            fetchUserEmail(storedUserId);
            fetchUserName(storedUserId);
        } else {
            setIsLoggedIn(false);
            setLoggedInUserId(null);
            setUserEmail('');
            setUserName('');
            setTasks([]);
        }
    }, [fetchTasks, fetchUserEmail, fetchUserName]);

    const addTaskHandle = async () => {
        if (loggedInUserId && newTaskToAdd.title.trim()) {
            try {
                const taskToAdd = { id: uuid(), title: newTaskToAdd.title, text: newTaskToAdd.text, completed: false, userId: loggedInUserId };
                const res = await axios.post(apiUrl + 'tasks', taskToAdd);
                console.log("Task added for user:", loggedInUserId);
                setTasks([...tasks, res.data]);
                setNewTaskToAdd({ title: '', text: '' });
            } catch (err) {
                console.error("Err adding task:", err);
            }
        } else {
            console.warn("Can't add task: Title is required.");
        }
    };

    const handleInputChange = (name, value) => {
        setNewTaskToAdd(prevTask => ({ ...prevTask, [name]: value }));
    };

    const deleteTask = async (taskId) => {
        try {
            const confirm = window.confirm("Are you sure you want to delete task?");
            if (confirm) {
            await axios.delete(apiUrl + `tasks/${taskId}`);
            setTasks(tasks.filter((task) => task.id !== taskId));
            } else {
                return;
            }
        } catch (err) {
            console.error("Err deleting task:", err);
        }
    };

    const toggleComplete = async (taskToUpdate) => {
        try {
            const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
            await axios.put(`${apiUrl}tasks/${taskToUpdate.id}`, updatedTask);
            setTasks(tasks.map(task =>
                task.id === taskToUpdate.id ? updatedTask : task
            ));
        } catch (err) {
            console.error("Task completion err:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setLoggedInUserId(null);
        setUserEmail('');
        setUserName('');
        setTasks([]);
        console.log('Logged out!');
        navigate('/login');
    };

    const handleLoginSuccess = (userId) => {
        setIsLoggedIn(true);
        setLoggedInUserId(userId);
        localStorage.setItem('token', localStorage.getItem('token'));
        localStorage.setItem('userId', userId);
        fetchTasks(userId);
        fetchUserEmail(userId);
        fetchUserName(userId);
    };

    const handleTogglePasswordChange = () => {
        setIsChangingPassword(!isChangingPassword);
        setNewPassword('');
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleSavePassword = async () => {
        if (loggedInUserId && newPassword && userEmail && userName) {
            try {
                await axios.put(`${apiUrl}users/${loggedInUserId}`, { password: newPassword, email: userEmail, username: userName });
                console.log('Password updated!');
                setIsChangingPassword(false);
                setNewPassword('');
                alert('Password changed!')
            } catch (error) {
                console.error('Error updating password:', error);
            }
        } else {
            console.warn('Could not update password. :(');
        }
    };

    const handleCancelPasswordChange = () => {
        setIsChangingPassword(false);
        setNewPassword('');
    };

    const handleDeleteUser = async () => {
        if (!loggedInUserId) {
            console.warn("Cannot delete user: No user logged in.");
            return;
        }

        const confirmDeleteTasks = window.confirm("Are you sure you want to delete your account? All your tasks will be deleted as well.");
        if (confirmDeleteTasks) {
            const confirmDeleteUser = window.confirm("This can't be undone. Are you absolutely sure you want to continue?");
            if (confirmDeleteUser) {
                try {
                    const tasksToDelete = await axios.get(`${apiUrl}tasks?userId=${loggedInUserId}`);
                    for (const task of tasksToDelete.data) {
                        await axios.delete(`${apiUrl}tasks/${task.id}`);
                        console.log(`Deleted task with ID: ${task.id}`);
                    }
                    console.log("All tasks for user deleted.");

                    await axios.delete(`${apiUrl}users/${loggedInUserId}`);
                    console.log("User deleted successfully.");

                    handleLogout();
                    navigate('/login');
                } catch (error) {
                    console.error("Error deleting user and/or tasks:", error);
                    alert("An error occurred while deleting your account.");
                }
            }
        }
    };

    return (
        <>
            <NavBar
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                handleTogglePasswordChange={handleTogglePasswordChange}
                isChangingPassword={isChangingPassword}
                newPassword={newPassword}
                handleNewPasswordChange={handleNewPasswordChange}
                handleSavePassword={handleSavePassword}
                handleCancelPasswordChange={handleCancelPasswordChange}
                handleDeleteUser={handleDeleteUser}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <>
                                <h1><span id="username">{userName}</span>'s tasks:</h1>
                                <TaskAdd
                                    onTaskAdd={addTaskHandle}
                                    onInputChange={handleInputChange}
                                />
                                <TaskList
                                    tasks={tasks}
                                    deleteTask={deleteTask}
                                    toggleComplete={toggleComplete}
                                    loggedInUserId={loggedInUserId}
                                    apiUrl={apiUrl}
                                    setTasks={setTasks}
                                />
                            </>
                        ) : (
                            <div className="homeDiv">
                                <h1>Welcome to your Task<i>List</i>!</h1>
                                <p className="loginRegPrompt">
                                    <Link to="/login">Log in</Link> | <Link to="/register">Register</Link>
                                </p>
                            </div>
                        )
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            </Routes>
        </>
    );
}
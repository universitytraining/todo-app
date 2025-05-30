import '../styles/Login.css'
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';



export default function Login({ onLoginSuccess, apiUrl }) {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post(apiUrl + 'login', formData);
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.accessToken);
            onLoginSuccess(response.data.user.id);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };





    return (
        <div className='loginDiv'>
            <h2>Login</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className='loginMailDiv'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='loginPassDiv'>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
            
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
};

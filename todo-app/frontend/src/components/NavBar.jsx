import '../styles/NavBar.css'
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({
    isLoggedIn,
    handleLogout,
    handleTogglePasswordChange,
    isChangingPassword,
    newPassword,
    handleNewPasswordChange,
    handleSavePassword,
    handleCancelPasswordChange,
    handleDeleteUser,
}) {
    return (
        <nav>
            <ul>
                <li id='logoText'><img src="/todo-app/TL.png" alt="" />Task<i>List</i></li>
                <li>
                    {!isLoggedIn ?
                        <Link to="/">Home</Link> : <Link to="/">My tasks</Link>
                    }
                </li>
                {!isLoggedIn &&
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                }
                {isLoggedIn ? (
                    <>

                        {isChangingPassword && (
                            <>
                                <li>
                                    <button id='passChangeSave' onClick={handleSavePassword}>Save Password</button>
                                </li>
                                <li>
                                    <input id='passChangeInput'
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={handleNewPasswordChange}
                                    />
                                </li>

                            </>
                        )}
                        <li>
                            <button id='passChangeBtn' onClick={handleTogglePasswordChange}>
                                {isChangingPassword ? 'Cancel Password Change' : 'Change Password'}
                            </button>
                        </li>
                        <li>
                            <button id='delAccBtn' onClick={handleDeleteUser}>
                                Delete Account
                            </button>
                        </li>
                        <li>
                            <Link id='logoutLink' to="#" onClick={handleLogout}>Logout</Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}
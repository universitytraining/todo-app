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
                    <li>
                        <button onClick={handleTogglePasswordChange}>
                            {isChangingPassword ? 'Cancel Password Change' : 'Change Password'}
                        </button>
                    </li>
                    {isChangingPassword && (
                        <>
                            <li>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                />
                            </li>
                            <li>
                                <button onClick={handleSavePassword}>Save Password</button>
                            </li>
                            <li>
                                <button onClick={handleCancelPasswordChange}>Cancel</button>
                            </li>
                        </>
                    )}
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                    <li>
                        <button onClick={handleDeleteUser} style={{ backgroundColor: 'red', color: 'white' }}>
                            Delete Account
                        </button>
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
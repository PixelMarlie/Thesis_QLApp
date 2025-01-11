import axios from "axios";
import { AlertCircle, CheckCircle, Lock, User } from 'lucide-react';
import React, { useState } from "react";
import './styles/formStyles.css';
import backgroundImage from './styles/image/BG.jpg';

function Register({ switchToLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [usernameValid, setUsernameValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);

    const validateUsername = (value) => {
        const isValid = value.length >= 3;
        setUsernameValid(isValid);
        return isValid;
    };

    const validatePassword = (value) => {
        const isValid = value.length >= 8;
        setPasswordValid(isValid);
        return isValid;
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        validateUsername(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);

        if (!isUsernameValid || !isPasswordValid) {
            setMessage("Please correct the errors before submitting.");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", {
                username,
                password,
            });
            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => switchToLogin(), 2000);
        } catch (error) {
            console.error("Registration failed:", error);
            setMessage(error.response?.data?.detail || "Registration failed. Try a different username.");
        }
    };

    return (
        <div className="form-container" style={{ backgroundImage: `url(${backgroundImage})`}}>
        {/* Centered text above the form */}
        <div className="app-title">
            Register your Account!
        </div>
            <div className="card-wrapper">
                <form onSubmit={handleRegister} noValidate>
                    <h2>Create Account</h2>
                    
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <div className="input-container">
                            <User className="input-icon" />
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                                minLength={3}
                                aria-invalid={usernameValid === false}
                                aria-describedby="username-requirements"
                                className={usernameValid === false ? 'input-error' : ''}
                            />
                            {usernameValid === false && <AlertCircle className="validation-icon error" />}
                            {usernameValid === true && <CheckCircle className="validation-icon success" />}
                        </div>
                        {usernameValid === false && (
                            <p id="username-requirements" className="input-hint error">
                                Username must be at least 3 characters long
                            </p>
                        )}
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <div className="input-container">
                            <Lock className="input-icon" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                minLength={8}
                                aria-invalid={passwordValid === false}
                                aria-describedby="password-requirements"
                                className={passwordValid === false ? 'input-error' : ''}
                            />
                            {passwordValid === false && <AlertCircle className="validation-icon error" />}
                            {passwordValid === true && <CheckCircle className="validation-icon success" />}
                        </div>
                        {passwordValid === false && (
                            <p id="password-requirements" className="input-hint error">
                                Password must be at least 8 characters long
                            </p>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        disabled={!(usernameValid && passwordValid)}
                        className="submit-button"
                    >
                        Register
                    </button>

                    {message && (
                        <div className="message-container">
                            <p className={message.includes("successful") ? 'success-message' : 'error-message'}>
                                {message}
                            </p>
                        </div>
                    )}

                    <p className="login-link">
                        Already have an account?{" "}
                        <a href="#" onClick={switchToLogin}>
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;

import axios from "axios";
import { Lock, User } from 'lucide-react'; // You can also add icons similar to the Register form
import React, { useState } from "react";
import './styles/formStyles.css';
import backgroundImage from './styles/image/BG.jpg';

function Login({ setToken, switchToRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", {
                username,
                password,
            });
            setToken(response.data.access);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="form-container" style={{ backgroundImage: `url(${backgroundImage})`}}>
            {/* Centered text above the form */}
            <div className="app-title">
                Social Learning App with Enhanced Q-Learning
            </div>

            <div className="card-wrapper">
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>

                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <div className="input-container">
                            <User className="input-icon" />
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <div className="input-container">
                            <Lock className="input-icon" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-button">
                        Login
                    </button>

                    <p className="login-link">
                        Don't have an account?{" "}
                        <a href="#" onClick={switchToRegister}>
                            Register here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;

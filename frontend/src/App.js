import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Sidebar from "./components/Sidebar.js";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [isRegistering, setIsRegistering] = useState(false);


    const switchToRegister = () => setIsRegistering(true);
    const switchToLogin = () => setIsRegistering(false);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [token]); // Update username when token changes

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken(null);
        setUsername(""); // Clear username
    };

    if (!token) {
        return isRegistering ? (
            <Register switchToLogin={switchToLogin} />
        ) : (
            <Login setToken={setToken} setUsername={setUsername} switchToRegister={switchToRegister} />
        );
    }

    //  <h4>Current User: {username}</h4>
    //  <button className="logout-btn" onClick={handleLogout}>Logout</button>

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Recommendations</h1>

            <Sidebar handleLogout={handleLogout} /> 
        </div>
    );
}

export default App;

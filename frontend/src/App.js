import axios from "axios";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";

function App() {
    const [token, setToken] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [isRegistering, setIsRegistering] = useState(false);

    const switchToRegister = () => setIsRegistering(true);
    const switchToLogin = () => setIsRegistering(false);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (token) {
                try {
                    const response = await axios.get(
                        "http://127.0.0.1:8000/api/recommendations/1/",
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    setRecommendations(response.data.recommendation);
                } catch (error) {
                    console.error("Error fetching recommendations:", error);
                }
            }
        };

        fetchRecommendations();
    }, [token]);

    if (!token) {
        return isRegistering ? (
            <Register switchToLogin={switchToLogin} />
        ) : (
            <Login setToken={setToken} switchToRegister={switchToRegister} />
        );
    }

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Recommendations</h1>
            <a href="/logout">
                <button className="logout-btn">Logout</button>
            </a>
            <ul>
                {recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;

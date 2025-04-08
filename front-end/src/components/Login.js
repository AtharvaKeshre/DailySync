import React, { useState } from "react";
import { login, isAuthenticated, logout } from "../Services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  const handleLogin = async () => {
    try {
      await login(username, password);
      setIsLoggedIn(true);
      alert("Login successful!");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    alert("Logged out successfully!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!isLoggedIn ? (
        <div>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "10px", padding: "10px", width: "200px" }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "10px", padding: "10px", width: "200px" }}
          />
          <br />
          <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
            Login
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h1>Welcome!</h1>
          <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
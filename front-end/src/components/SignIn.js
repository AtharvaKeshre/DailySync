import React, { useState } from "react";
import jwtDecode from "jwt-decode"; 
import { login, isAuthenticated, logout } from "../Services/authService";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  const handleSignIn = async () => {
    try {
      const token = await login(username, password); // Call login function from authService
      const decodedToken = jwtDecode(token); // Decode the JWT token to extract role
      setRole(decodedToken.role); 
      setIsLoggedIn(true);
      alert(`Login successful! Role: ${decodedToken.role}`);
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setRole(null);
    alert("Logged out successfully!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!isLoggedIn ? (
        <div>
          <h1>Sign In</h1>
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
          <button onClick={handleSignIn} style={{ padding: "10px 20px" }}>
            Sign In
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h1>Welcome!</h1>
          {role === "ADMIN" && <p>You are logged in as an Admin.</p>}
          {role === "USER" && <p>You are logged in as a User.</p>}
          <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default SignIn;
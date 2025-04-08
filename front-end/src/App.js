import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import Home from "./components/Home"; // Create a Home component if not already present
import AdminDashboard from "./components/AdminDashboard"; // Create an AdminDashboard component
import UserDashboard from "./components/UserDashboard"; // Create a UserDashboard component
import NotFound from "./components/NotFound"; // Create a NotFound component

function App() {
  const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/signin" replace />;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    if (role && decodedToken.role !== role) {
      return <Navigate to="/signin" replace />;
    }

    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute role="USER">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
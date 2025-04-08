const API_URL = "http://localhost:8080/journal/public";

export async function login(username, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const token = await response.text(); 
    localStorage.setItem("token", token); 
    return token;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token; 
}

export function logout() {
  localStorage.removeItem("token"); 
}

export function getToken() {
  return localStorage.getItem("token");
}
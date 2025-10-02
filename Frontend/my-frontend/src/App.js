import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [response, setResponse] = useState(null);

  // Define your FastAPI backend URL here
  const API_BASE = "https://fastapi-render-deployment-zvji.onrender.com"; // Your deployed backend URL

  // Create user
  const createUser = async () => {
    if (!username) return alert("Please enter a username");

    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username }),
      });
      const data = await res.json();
      setResponse(data);
      setUsername(""); // Clear input
    } catch (err) {
      console.error(err);
      setResponse({ error: "Failed to create user" });
    }
  };

  // Get total user count
  const getCount = async () => {
    try {
      const res = await fetch(`${API_BASE}/users/count`);
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({ error: "Failed to fetch user count" });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={createUser} style={{ marginLeft: "10px" }}>
        Create User
      </button>
      <button onClick={getCount} style={{ marginLeft: "10px" }}>
        Get User Count
      </button>

      {response && (
        <pre style={{ marginTop: "20px", background: "#eee", padding: "10px" }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
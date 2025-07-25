import React, { useEffect, useState } from "react";
import { FaTrophy, FaUserCircle, FaCrown } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE;

const App = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [error, setError] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(new URL("/api/users/leaderboard", API_BASE));
      const data = await response.json();
      console.log(data);
      const sorted = data.sort((a, b) => b.totalPoints - a.totalPoints);
      setLeaderboardData(sorted);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
      setError("Failed to load leaderboard.");
    }
  };

  const addNewUser = async () => {
    try {
      const res = await fetch(new URL("/api/users", API_BASE), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newUserName}),
      });
      if (!res.ok) throw new Error("Failed to add user");
      setNewUserName("");
      fetchLeaderboard();
    } catch (err) {
      alert(err.message);
    }
  };

  const assignRandomPoints = async () => {
    if (!selectedUserId) return;
    console.log(leaderboardData);
    const randomPoints = Math.floor(Math.random() * 101);
    try {
      console.log(selectedUserId)
      const res = await fetch(new URL(`/api/claim/${selectedUserId}`, API_BASE), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points: randomPoints }),
      });
      if (!res.ok) throw new Error("Failed to assign points");
      fetchLeaderboard();
    } catch (err) {
      alert(err.message);
    }
  };

  const topThree = leaderboardData.slice(0, 3);
  const rankStyles = [
    { height: "220px", fontSize: "1.2rem" },
    { height: "250px", fontSize: "1.4rem" },
    { height: "200px", fontSize: "1rem" },
  ];
  const crownColors = ["silver", "gold", "peru"];

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "210vh",
        backgroundColor: "#121212",
        padding: "2rem",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaTrophy style={{ marginRight: "0.5rem", color: "gold" }} />
        Leaderboard
      </h1>

      {/* New User Input */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "1rem" }}
        />
        <button onClick={addNewUser} style={{ padding: "0.5rem 1rem" }}>
          Add User
        </button>
      </div>

      {/* Assign Random Points */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "1rem" }}
        >
          <option value="">Select User</option>
          {leaderboardData.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={assignRandomPoints} style={{ padding: "0.5rem 1rem" }}>
          Add Random Points
        </button>
      </div>

      {/* Top 3 Users */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: "2rem",
          marginBottom: "3rem",
        }}
      >
        {[topThree[1], topThree[0], topThree[2]].map((user, index) => {
          if (!user) return null;
          return (
            <div
              key={user._id}
              style={{
                backgroundColor: "#1f1f1f",
                borderRadius: "12px",
                padding: "1rem",
                boxShadow: "0 2px 10px rgba(255, 255, 255, 0.05)",
                width: "150px",
                textAlign: "center",
                ...rankStyles[index],
              }}
            >
              <FaCrown style={{ color: crownColors[index], fontSize: "1.5rem" }} />
              <FaUserCircle style={{ fontSize: "2.5rem", color: "#bbb" }} />
              <h3 style={{ margin: "0.5rem 0 0", fontSize: rankStyles[index].fontSize }}>
                {user.name}
              </h3>
              <p style={{ margin: "0", fontSize: "0.8rem", color: "#aaa" }}>
                {user.totalPoints} pts
              </p>
            </div>
          );
        })}
      </div>

      {/* Remaining Users */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        {leaderboardData.slice(3).map((user, index) => (
          <div
            key={user._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#1f1f1f",
              borderRadius: "12px",
              padding: "1rem 1.5rem",
              boxShadow: "0 2px 10px rgba(255, 255, 255, 0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "1.2rem", width: "1.5rem", textAlign: "center" }}>
                {index + 4}
              </span>
              <FaUserCircle style={{ fontSize: "2rem", color: "#bbb" }} />
              <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{user.name}</h3>
              </div>
            </div>
            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{user.totalPoints} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { FaTrophy, FaUserCircle, FaCrown } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE;


const App = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${API_BASE}api/users/leaderboard`);
        const data = await response.json();
        const sorted = data.sort((a, b) => b.totalPoints - a.totalPoints);
        setLeaderboardData(sorted);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        setError("Failed to load leaderboard.");
      }
    };

    fetchLeaderboard();
  }, []);

  const topThree = leaderboardData.slice(0, 3);

  const rankStyles = [
    { height: "220px", fontSize: "1.2rem" }, // 2nd place
    { height: "250px", fontSize: "1.4rem" }, // 1st place
    { height: "200px", fontSize: "1rem" },   // 3rd place
  ];

  const crownColors = ["silver", "gold", "peru"]; // center = gold

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth:"210vh",
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
              <span
                style={{
                  fontSize: "1.2rem",
                  width: "1.5rem",
                  textAlign: "center",
                }}
              >
                {index + 4}
              </span>
              <FaUserCircle style={{ fontSize: "2rem", color: "#bbb" }} />
              <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{user.name}</h3>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#aaa" }}>{user.email}</p>
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

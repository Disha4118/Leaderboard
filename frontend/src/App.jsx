import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
const BASE_URL = import.meta.env.VITE_API_BASE;

const fetchUsers = async () => {
  const res = await axios.get(`${BASE_URL}/api/users`);
};
<<<<<<< HEAD
=======

>>>>>>> d3b783a (save local changes before pull)


const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pointsAwarded, setPointsAwarded] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data);
  };

  const fetchLeaderboard = async () => {
    const res = await axios.get('http://localhost:5000/api/users/leaderboard');
    setLeaderboard(res.data);
  };

  const handleClaim = async () => {
    if (!selectedUser) return;
    const res = await axios.post(`http://localhost:5000/api/claim/${selectedUser}`);
    setPointsAwarded(res.data.points);
    fetchLeaderboard();
  };

  const handleAddUser = async () => {
    if (!newUserName) return;
    const res = await axios.post('http://localhost:5000/api/users', { name: newUserName });
    setNewUserName('');
    fetchUsers();
    fetchLeaderboard();
  };

  return (
    <div style={{ padding: '20px' }} className='container'>
      <h2>Leaderboard System</h2>

      <div>
        <h4>Add New User:</h4>
        <input value={newUserName} onChange={(e) => setNewUserName(e.target.value)} placeholder="User name" />
        <button onClick={handleAddUser}>Add</button>
      </div>

      <div>
        <h4>Select User:</h4>
        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
          <option value="">-- Select --</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
        <button onClick={handleClaim}>Claim Points</button>
        {pointsAwarded && <p>Random Points Awarded: {pointsAwarded}</p>}
      </div>

      <h4>Leaderboard:</h4>
      <table border="1">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map(user => (
            <tr key={user.name}>
              <td>{user.rank}</td>
              <td>{user.name}</td>
              <td>{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;


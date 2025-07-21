const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const newUser = new User({ name });
  await newUser.save();
  res.status(201).json(newUser);
});

router.get('/leaderboard', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  const leaderboard = users.map((user, index) => ({
    _id: user._id, 
    rank: index + 1,
    name: user.name,
    totalPoints: user.totalPoints,
  }));
  console.log(leaderboard);
  res.json(leaderboard);
});

module.exports = router;
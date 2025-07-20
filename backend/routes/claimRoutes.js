const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Claim = require('../models/Claim');

router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  user.totalPoints += randomPoints;
  await user.save();

  const claim = new Claim({ userId, points: randomPoints });
  await claim.save();

  res.json({ points: randomPoints });
});

module.exports = router;
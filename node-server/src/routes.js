const express = require('express');
const router = express.Router();
const game = require('./game.js');

router.get('/', (req, res) => {
  res.send('Chat Server is running');
});

router.post('/api/matchmaking/join', (req, res) => {
  game.queueManager(req, res);
});

module.exports = router;

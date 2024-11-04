const express = require('express');
const router = express.Router();
const queue = require('./queue.js');

router.get('/', (req, res) => {
  res.send('Chat Server is running');
});

router.post('/api/matchmaking/join', (req, res) => {
  queue.queueManager(req, res);
});

module.exports = router;

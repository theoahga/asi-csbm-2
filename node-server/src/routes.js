const express = require('express');
const router = express.Router();
const queue = require('./queue.js');
const connectedUsers = require('./connectedUsers');

router.get('/', (req, res) => {
  res.send('Chat Server is running');
});

router.post('/api/matchmaking/join', (req, res) => {
  res.send(queue.handleJoinPlayer(req.body.id));
});

router.get('/network/connectedusers', (req, res) => {
  res.send(connectedUsers.getAllConnectedUserIds());
})

module.exports = router;

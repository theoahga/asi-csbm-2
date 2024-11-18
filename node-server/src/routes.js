const express = require('express');
const router = express.Router();
const gameMaster = require('./game/gameMaster.js');

router.get('/', (req, res) => {
  res.send('Chat Server is running');
});

router.post('/api/matchmaking/join', (req, res) => {
  res.send(gameMaster.joinPlayer(req.body.id));
});

router.get('/network/connectedusers', (req, res) => {
  res.send(connectedUsers.getAllConnectedUserIds());
})

module.exports = router;

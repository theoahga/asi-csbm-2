const express = require('express');
const router = express.Router();
const GameManager = require('./game/GameManager.js');
const NetworkManager = require("./user/ConnectedUsers");

router.get('/', (req, res) => {
  res.send('Chat Server is running');
});

router.post('/api/matchmaking/join', (req, res) => {
  res.send(GameManager.joinPlayer(req.body.id));
});

router.get('/network/connectedusers', (req, res) => {
  res.send(NetworkManager.getAllConnectedUserIds());
})

module.exports = router;

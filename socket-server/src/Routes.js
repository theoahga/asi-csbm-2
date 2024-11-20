const express = require('express');
const router = express.Router();
const GameManager = require('./game/Games');
const NetworkManager = require("./user/ConnectedUsers");

router.get('/', (req, res) => {
  res.send('Chat Server is running');
});

router.get('/network/connectedusers', (req, res) => {
  res.send(NetworkManager.getAllConnectedUserIds());
})

module.exports = router;

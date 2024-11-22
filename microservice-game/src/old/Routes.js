const express = require('express');
const GameManager = require("./game/GameManager");
const router = express.Router();


router.get('/', (req, res) => {
  res.send('Server is running');
});

router.post('/join', (req, res) => {
  res.send(GameManager.joinPlayer(req.body.id));
});

module.exports = router;

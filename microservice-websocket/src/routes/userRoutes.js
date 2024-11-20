const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.getConnectedUsers);

router.post('/:user_id/message', UserController.sendMessageToUser);

router.post('/broadcast', UserController.broadcastMessage);

module.exports = router;

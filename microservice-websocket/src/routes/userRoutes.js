import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/', UserController.getConnectedUsers);
router.post('/:user_id/message', UserController.sendMessageToUser);
router.post('/broadcast', UserController.broadcastMessage);

export default router;
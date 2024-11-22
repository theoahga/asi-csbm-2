import express from 'express';
import ChatController from '../controllers/ChatController.js';

const router = express.Router();

router.post('/:user_id/message', ChatController.sendMessageToUser);
router.post('/broadcast', ChatController.broadcastMessage);

export default router;

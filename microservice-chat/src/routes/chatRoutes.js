import express from 'express';
import ChatController from '../controllers/ChatController.js';

const router = express.Router();

router.post('/:user_id/:sender_id/message', ChatController.sendMessageToUser);
router.post('/broadcast', ChatController.broadcastMessage);
router.get('/history/:sender_id/:receiver_id', ChatController.getHistory);

export default router;

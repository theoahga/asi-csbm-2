import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/', UserController.getConnectedUsers);
router.post('/:receiver_id/:sender_id/message', UserController.sendMessageToUser);
router.post('/broadcast', UserController.broadcastMessage);
router.post('/:user_id/message/:event_id', UserController.sendMessageToUserCustomEvent);

export default router;

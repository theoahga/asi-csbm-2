import socketService from '../services/SocketService.js';

class UserController {
    static getConnectedUsers(req, res) {
        const users = socketService.getConnectedUsers();
        res.json({ users });
    }

    static sendMessageToUser(req, res) {
        const { user_id } = req.params;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message content is required' });
        }

        const success = socketService.sendMessageToUser(user_id, message);
        if (success) {
            res.json({ status: 'Message sent' });
        } else {
            res.status(404).json({ error: 'User not connected' });
        }
    }

    static broadcastMessage(req, res) {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message content is required' });
        }

        socketService.broadcastMessage(message);
        res.json({ status: 'Message broadcasted' });
    }
}

export default UserController;

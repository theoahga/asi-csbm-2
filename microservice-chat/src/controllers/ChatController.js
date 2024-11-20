import chatService from '../services/ChatService.js';

class ChatController {
    /**
     * Envoie un message à un utilisateur spécifique.
     */
    static async sendMessageToUser(req, res) {
        const { user_id } = req.params;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message content is required.' });
        }

        try {
            const result = await chatService.sendMessageToUser(user_id, message);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Diffuse un message à tous les utilisateurs connectés.
     */
    static async broadcastMessage(req, res) {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message content is required.' });
        }

        try {
            const result = await chatService.broadcastMessage(message);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default ChatController;

import chatService from '../services/ChatService.js';

class ChatController {
    /**
     * Envoie un message à un utilisateur spécifique.
     */
    static async sendMessageToUser(req, res) {
        const { receiver_id, sender_id } = req.params;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message content is required.' });
        }

        if (!sender_id) {
            return res.status(400).json({ error: 'Sender id is required.' });
        }

        try {
            const result = await chatService.sendMessageToUser(receiver_id, sender_id, message);
            res.json(result);

            await chatService.saveMessageToHistory(receiver_id, sender_id, message);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Récupère la conversation des deux personnes
     */
    static async getHistory(req, res) {
        const { sender_id, receiver_id } = req.params;

        if (!sender_id || !receiver_id) {
            return res.status(400).json({ error: 'Sender id and receiver id are required.' });
        }

        try {
            const result = await chatService.getHistory(sender_id, receiver_id);
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
        const sender_id = req.body.sender_id; 

        if (!message) {
            return res.status(400).json({ error: 'Message content is required.' });
        }

        try {
            const result = await chatService.broadcastMessage({
                message: message,
                sender_id: sender_id
            });            
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    /**
     * Envoie un message à un utilisateur spécifique.
     */
    static async getConnectedUsers(req, res) {
        try {
            const result = await chatService.getConnectedUsers();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default ChatController;

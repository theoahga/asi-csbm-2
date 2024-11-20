import fetch from 'node-fetch';

const BASE_URL = process.env.WEBSOCKET_SERVICE_URL || 'http://localhost:3000/chat';

class ChatService {
    constructor() {
        this.baseUrl = BASE_URL;
    }

    /**
     * Envoie un message à un utilisateur spécifique.
     * @param {string} userId - ID de l'utilisateur cible.
     * @param {string} message - Message à envoyer.
     */
    async sendMessageToUser(userId, message) {
        try {
            const response = await fetch(`${this.baseUrl}/${userId}/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message to user.');
            }

            return await response.json();
        } catch (error) {
            throw new Error(error.message || 'Failed to send message to user.');
        }
    }

    /**
     * Diffuse un message à tous les utilisateurs connectés.
     * @param {string} message - Message à diffuser.
     */
    async broadcastMessage(message) {
        try {
            const response = await fetch(`${this.baseUrl}/broadcast`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to broadcast message.');
            }

            return await response.json();
        } catch (error) {
            throw new Error(error.message || 'Failed to broadcast message.');
        }
    }
}

export default ChatService;

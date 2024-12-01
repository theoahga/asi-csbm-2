import fetch from 'node-fetch';

const BASE_URL = process.env.WEBSOCKET_SERVICE_URL || 'http://localhost:3000/api/users';
const BASE_SPRING_URL = process.env.WEBSOCKET_SERVICE_URL || 'http://localhost:8081/api';

class ChatService {
    constructor() {
        this.base_url = BASE_URL;
        this.springBaseUrl = BASE_SPRING_URL;
    }

    /**
     * Envoie un message à un utilisateur spécifique.
     * @param {string} userId - ID de l'utilisateur cible.
     * @param {string} message - Message à envoyer.
     */
    static async sendMessageToUser(receiver_id,sender_id, message) {
        try {
            const response = await fetch(`${BASE_URL}/${receiver_id}/${sender_id}/message`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message}),
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
     * Get the conversation between two persons
     * @param {string} senderId
     * @param {string} receiverId
     * @returns {Promise<any>}
     */
    static async getHistory(senderId, receiverId) {
        try {
            const response = await fetch(`${BASE_SPRING_URL}/message/conversation/${senderId}/${receiverId}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to get the wanted conversation');
            }

            return await response.json();
        } catch (error) {
            throw new Error(error.message || 'Failed to send message to user.');
        }
    }

    /**
     * Saves the message in the history on endpoint /api/chat/create
     * @param {string} user_id
     * @param {string} sender_id
     * @param {string} message
     * @returns {Promise<void>}
     */
    static async saveMessageToHistory(user_id, sender_id, message) {

        const payload = {
            sender: sender_id,
            receiver: user_id,
            content: message
        }

        console.log(payload);

        try {
            const response = await fetch(`${BASE_SPRING_URL}/message/create`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to save the message in the history');
            }

            return await response.json();
        } catch (error) {
            throw new Error(error.message || 'An unexpected error occurred while saving the message');
        }
    }

    /**
     * Diffuse un message à tous les utilisateurs connectés.
     * @param {string} message - Message à diffuser.
     */
    static async broadcastMessage(message) {
        try {
            const response = await fetch(`${BASE_URL}/broadcast`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message}),
            });
            console.log("ALLALA ",JSON.stringify({message}))

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to broadcast message.');
            }

            return await response.json();
        } catch (error) {
            throw new Error(error.message || 'Failed to broadcast message.');
        }
    }

     /**
     * .
     */
     static async getConnectedUsers() {
        try {
            const response = await fetch(`${BASE_URL}/`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to get users.');
            }
            return await response.json();
        } catch (error) {
            throw new Error(error.message || 'Failed to get users.');
        }
    }
}

export default ChatService;

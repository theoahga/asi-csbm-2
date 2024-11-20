class SocketService {
    constructor() {
        this.users = new Map(); // user_id -> socket
    }

    /**
     * Initialise les événements WebSocket.
     * @param {Server} io - Instance de Socket.IO.
     */
    init(io) {
        this.io = io;
        io.on('connection', (socket) => {
            console.log(`New client connected: ${socket.id}`);

            // Enregistrer un utilisateur
            socket.on('register', (user_id) => {
                this.users.set(user_id, socket);
                console.log(`User registered: ${user_id}`);
            });

            // Déconnexion
            socket.on('disconnect', () => {
                this.removeSocket(socket.id);
            });
        });
    }

    /**
     * Supprime un socket déconnecté.
     * @param {string} socketId - ID du socket à supprimer.
     */
    removeSocket(socketId) {
        for (const [user_id, userSocket] of this.users.entries()) {
            if (userSocket.id === socketId) {
                this.users.delete(user_id);
                console.log(`User disconnected: ${user_id}`);
                break;
            }
        }
    }

    /**
     * Obtient la liste des utilisateurs connectés.
     * @returns {Array<string>} Liste des IDs d'utilisateur.
     */
    getConnectedUsers() {
        return Array.from(this.users.keys());
    }

    /**
     * Envoie un message à un utilisateur spécifique.
     * @param {string} userId - ID de l'utilisateur cible.
     * @param {string} message - Message à envoyer.
     * @returns {boolean} Succès ou échec.
     */
    sendMessageToUser(userId, message) {
        const socket = this.users.get(userId);
        if (socket) {
            socket.emit('message', message);
            return true;
        }
        return false;
    }

    /**
     * Diffuse un message à tous les utilisateurs.
     * @param {string} message - Message à diffuser.
     */
    broadcastMessage(message) {
        this.users.forEach((socket) => {
            socket.emit('message', message);
        });
    }
}

export default new SocketService();

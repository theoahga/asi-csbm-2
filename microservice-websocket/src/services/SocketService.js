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
    io.on("connection", (socket) => {
      console.log(`New client connected: ${socket.id}`);
      socket.on("register", (user_id) => {
        this.user_id = user_id
        this.users.set(user_id, socket);
        console.log(`User registered: ${this.user_id}`);
      });

      // Déconnexion
      socket.on("disconnect", () => {
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
   * @param {string} receiverId - ID de l'utilisateur cible.
   * @param {string} message - Message à envoyer.
   * @returns {boolean} Succès ou échec.
   */
  sendMessageToUser(receiver_id, sender_id,message) {
    console.log("ETAPE 1 ")
    const socket = this.users.get(parseInt(receiver_id));
    console.log("ETAPE 2 ")
    console.log("socket array : ",socket)
    console.log("users gros : ",this.users)
    const messageObject = {
      content: message.message, // Le texte du message
      sender_id: sender_id, // L'ID de l'envoyeur
      receiver_id:receiver_id,
      creationDate: new Date().toISOString(), // La date de création
    };
    if (socket) {
      console.log("Message : ", message, " par ", receiver_id);
      socket.emit("message", messageObject);
      return true;
    }
    console.log("PAS DE CHAUSSETTE ")

    return false;
  }

  /**
   * Envoie un message à un utilisateur spécifique sur un message particulier.
   * @param {string} userId - ID de l'utilisateur cible.
   * @param {string} event_id - ID de l'event.
   * @param {string} message - Message à envoyer.
   * @returns {boolean} Succès ou échec.
   */
  sendMessageToUserCustomEvent(userId, event_id, message) {
    const socket = this.users.get(userId);
    if (socket) {
      console.log(
        "Message : ",
        message,
        " par ",
        userId,
        "sur le chanel prive ",
        event_id,
      );
      socket.emit(event_id, message);
      return true;
    }
    return false;
  }

  /**
   * Diffuse un message à tous les utilisateurs.
   * @param {string} message - Message à diffuser.
   */
  broadcastMessage(message) {
    const messageObject = {
      content: message.message, 
      sender_id: message.sender_id, 
      receiver_id:null,
      creationDate: new Date().toISOString(), 
      
    };

    console.log("Broadcasting message:", messageObject);

    this.users.forEach((socket) => {
        socket.emit("message", messageObject);
    });
  }
}

export default new SocketService();

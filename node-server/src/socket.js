const socketIo = require('socket.io');
const { addUser, removeUser, getUserSocketId } = require('./connectedUsers');
const game = require('./games');

let io = null;

function initSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    const user_id = socket.handshake.query.user_id;

    if (user_id) {
      addUser(user_id, socket.id);
      console.log(`User connected: ${user_id}`);

      socket.on("receivemessage", (json) => {
        let message = JSON.parse(json);
        console.log(`Message from ${user_id} to ${message.recipient_id}: ${message.message}`);

        if (message.recipient_id === "all") {
          io.emit("sendmessage", { sender_id: user_id, message });
        } else {
          const recipientSocketId = getUserSocketId(message.recipient_id);
          if (recipientSocketId) {
            io.to(recipientSocketId).emit("sendmessage", JSON.stringify( { sender_id: user_id, message }));
          } else {
            console.log(`Recipient ${message.recipient_id} not connected.`);
          }
        }
      });

      socket.on("disconnect", () => {
        removeUser(user_id);
        console.log(`User disconnected: ${user_id}`);
      });
    } else {
      console.log("Connection without user_id");
      socket.disconnect(true);
    }
  });
}

function handleUserJoin(userId, gameRoomId){
  let socket = io.sockets.sockets.get(getUserSocketId(userId));
  if(!game.getGamePlayersByGameId(gameRoomId)){
    game.addGame(gameRoomId,userId);
  }else {
    game.addPlayerToGame(gameRoomId,userId);
  }
  socket.join(gameRoomId)
  console.log(`Salle ${gameRoomId} créée par ${userId}`);
}

module.exports = {
  initSocket,
  handleUserJoin
};

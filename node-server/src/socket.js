const socketIo = require("socket.io");
const { addUser, removeUser, getUserSocketId } = require("./connectedUsers");
const game = require("./game/games");

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
        let userMessage = json.message;
        console.log(
          `Message from ${user_id} to ${json.recipient_id}: ${json.message}`,
        );

        if (json.recipient_id === "all") {
          io.emit("sendmessage", { sender_id: user_id, userMessage });
          console.log("message sent on the send event message");
        } else {
          const recipientSocketId = getUserSocketId(json.recipient_id);
          console.log("the recipient id " + recipientSocketId);
          if (recipientSocketId) {
            io.to(recipientSocketId).emit(
              "sendmessage",
              JSON.stringify({ sender_id: user_id, userMessage }),
            );
          } else {
            console.log(`Recipient ${json.recipient_id} not connected.`);
          }
        }
      });

      socket.on("disconnect", () => {
        removeUser(user_id);
        game.removeIfPlayerIsAloneInGames(user_id);
        console.log(`User disconnected: ${user_id}`);
      });
    } else {
      console.log("Connection without user_id");
      socket.disconnect(true);
    }
  });
}

function getSocketUser(userId) {
  return io.sockets.sockets.get(getUserSocketId(userId));
}

function sendMessage(socketId, eventId, message) {
  io.to(socketId).emit(eventId, message);
}
module.exports = {
  initSocket,
  getSocketUser,
  sendMessage,
};

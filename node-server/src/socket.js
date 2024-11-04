const socketIo = require('socket.io');
const { addUser, removeUser, getUserSocketId } = require('./connectedUsers');

function initSocket(server) {
  const io = socketIo(server, {
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

      socket.on("receivemessage", ({ recipient_id, message }) => {
        console.log(`Message from ${user_id} to ${recipient_id}: ${message}`);

        if (recipient_id === "all") {
          io.emit("sendmessage", { sender_id: user_id, message });
        } else {
          const recipientSocketId = getUserSocketId(recipient_id);
          if (recipientSocketId) {
            io.to(recipientSocketId).emit("sendmessage", { sender_id: user_id, message });
          } else {
            console.log(`Recipient ${recipient_id} not connected.`);
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

module.exports = initSocket;

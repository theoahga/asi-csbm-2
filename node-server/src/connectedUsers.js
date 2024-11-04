const connectedUsers = new Map();

function addUser(user_id, socketId) {
  connectedUsers.set(user_id, socketId);
}

function removeUser(user_id) {
  connectedUsers.delete(user_id);
}

function getUserSocketId(user_id) {
  return connectedUsers.get(user_id);
}

module.exports = {
  addUser,
  removeUser,
  getUserSocketId,
};

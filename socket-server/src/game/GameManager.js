const { getSocketUser, sendMessage } = require("../Socket");
const { getNextGameID, getGameByGameId, addGame, addPlayerToGame } = require("./Games");
const {startGame, handlePlayerAction} = require("./GameLogic/GameActionHandling");

let waitingPlayer = null;

function joinPlayer(userId) {
    console.log(`User ${userId} is trying to find a game`);

    if (waitingPlayer && getSocketUser(waitingPlayer.id)) {
        const message = handlePlayerWaiting(userId);
        waitingPlayer = null;
        return message;
    } else {
        return handleNoPlayerWaiting(userId);
    }
}

function handlePlayerWaiting(userId) {
    const gameId = waitingPlayer.gameId;
    joinUserToGame(userId, gameId);

    console.log(`User ${userId} has joined the game ${gameId}`);
    sendMessage(gameId, "roommessage", "The game will start soon!");

    startGame(gameId);

    return { message: `Match found: ${gameId}` };
}

function handleNoPlayerWaiting(userId) {
    waitingPlayer = { id: userId, gameId: getNextGameID() };
    console.log(`User ${userId} is waiting in game ${waitingPlayer.gameId}`);
    joinUserToGame(userId, waitingPlayer.gameId);

    return { message: "Waiting for an opponent..." };
}

function joinUserToGame(userId, gameRoomId) {
    const socket = getSocketUser(userId);
    if (!getGameByGameId(gameRoomId)) {
        addGame(gameRoomId, userId);
        console.log(`Room ${gameRoomId} created by ${userId}`);
    } else {
        addPlayerToGame(gameRoomId, userId);
    }
    socket.join(gameRoomId);
    socket.on("gameServer", handlePlayerAction);
}

module.exports = { joinPlayer };

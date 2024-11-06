const {handleUserJoin,sendMessage} = require("./socket");
const { addGame, removeGame, getGameById, getNextGameID } = require('./games.js');
let waitingPlayer = null;

function handleJoinPlayer(userId){
    console.log(`User ${userId} is trying to find a game`);
    if(waitingPlayer){
        let message = handleWhenPlayerWaiting(userId);
        waitingPlayer = null;
        return message;
    }else{
        return handleWhenNoPlayer(userId)
    }
}

function handleWhenPlayerWaiting(userID){
    handleUserJoin(userID,waitingPlayer.gameId);
    console.log(`User ${userID} has joined the game ${waitingPlayer.gameId}`);
    sendMessage(waitingPlayer.gameId,"roommessage","The game will start soon !");
    return {message: `Match found : ${waitingPlayer.gameId}`};
}

function handleWhenNoPlayer(userID){
    waitingPlayer = { id: userID, gameId: getNextGameID() };
    console.log(`User ${userID} has joined the game ${waitingPlayer.gameId}`);
    handleUserJoin(userID,waitingPlayer.gameId)
    return { message: 'Waiting for an opponent...' };
}

module.exports = {handleJoinPlayer};
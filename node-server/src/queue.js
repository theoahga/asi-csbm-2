const {matchFinder, matchFound, handleUserJoin} = require("./socket");
const { addGame, removeGame, getGameById, getNextGameID } = require('./games.js');
let waitingPlayer = null;

function handleJoinPlayer(userId){
    console.log(`L'utilisateur ${userId} tente de se connecter`);
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
    return {message: `Match found : ${waitingPlayer.gameId}`};
}

function handleWhenNoPlayer(userID){
    waitingPlayer = { id: userID, gameId: getNextGameID() };
    handleUserJoin(userID,waitingPlayer.gameId)
    return { message: 'Waiting for an opponent...' };
}

module.exports = {handleJoinPlayer};
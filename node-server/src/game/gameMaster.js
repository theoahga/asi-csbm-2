const {sendMessage, getSocketUser} = require("../socket");
const { getNextGameID, addCardsToPlayer, getGameByGameId, getGameByPlayerId} = require('./games');
const { getUserSocketId } = require('../connectedUsers');
const game = require("./games");
const cardService = require("../service/cardService");
const gameService = require("../service/gameService");

let waitingPlayer = null;

function joinPlayer(userId){
    console.log(`User ${userId} is trying to find a game`);

    if(waitingPlayer && getUserSocketId(waitingPlayer.id)){
        let message = handleWhenPlayerWaiting(userId);
        waitingPlayer = null;
        return message;
    }else{
        return handleWhenNoPlayer(userId)
    }
}

function handleWhenPlayerWaiting(userID){
    socketUserJoin(userID,waitingPlayer.gameId);

    console.log(`User ${userID} has joined the game ${waitingPlayer.gameId}`);
    sendMessage(waitingPlayer.gameId,"roommessage","The game will start soon !");

    startGame()

    return {message: `Match found : ${waitingPlayer.gameId}`};
}

function handleWhenNoPlayer(userID){
    waitingPlayer = { id: userID, gameId: getNextGameID() };
    console.log(`User ${userID} has joined the game ${waitingPlayer.gameId}`);
    socketUserJoin(userID,waitingPlayer.gameId)
    return { message: 'Waiting for an opponent...' };
}

function socketUserJoin(userId, gameRoomId){
    let socket = getSocketUser(userId)
    if(!game.getGameByGameId(gameRoomId)){
        game.addGame(gameRoomId,userId);
        console.log(`Room ${gameRoomId} created by ${userId}`);
    }else {
        game.addPlayerToGame(gameRoomId,userId);
    }
    socket.join(gameRoomId)
    socket.on("gameServer", (action) => {
        handlePlayerAction(action);
    })
}

function handlePlayerAction(action){
    switch(action.type){
        case "cards_choice":
            /*{
                "type" : "cards_choice",
                "userId" : 2,
                "gameId" : 1,
                "cards" : [
                    1,2,3,4
                ]
            }*/
            let userId = action.userId
            let cards = cardService.checkAndGetCards(action.cards, userId);
            addCardsToPlayer(userId, cards);
            updateDeckState(userId);
            break;
        case "attack":
            /*{
                "type" : "attack",
                "userId" : 2,
                "gameId" : 1,
                "cardFrom" : 2,
                "cardTo" : 3
            }*/

            break;
    }
}

function askForCardsChoice(gameId){
    let getCardsRequest = {
        type: "cards_choice"
    }
    sendMessage(gameId,"gameClient",getCardsRequest);
}

function startGame(gameId){
    askForCardsChoice(waitingPlayer.gameId);
}

function updateDeckState(userId){
    let game = getGameByPlayerId(userId);
    game.steps.card_choice.push(userId);
}

function checkDeckState(userId){
    let game = getGameByPlayerId(userId);
    if (game.steps.card_choice.length === 2){
        // Continue
    }
}

module.exports = {joinPlayer};
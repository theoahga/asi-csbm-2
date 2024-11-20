const {sendMessage, getSocketUser} = require("../socket");
const { getNextGameID, addCardsToPlayer, getGameByGameId, getGameByPlayerId, removeGame} = require('./games');
const { getUserSocketId, getAllConnectedUserIds} = require('../connectedUsers');
const game = require("./games");
const cardService = require("../service/cardService");
const gameService = require("../service/gameService");
const {updateCardState} = require("../service/cardService");
const {attack} = require("../service/gameService");

const ACTION_POINTS = 2;

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

    startGame(waitingPlayer.gameId)

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
                    1,2,3
                ]
            }*/
            handleCardChoice(action);
            break;
        case "attack":
            /*{
                "type" : "attack",
                "userId" : 2,
                "gameId" : 1,
                "cardFrom" : 2,
                "cardTo" : 3
            }*/
            handleAttack(action);
            break;
        case "skipturn":
            /*{
                "type" : "skipturn",
                "gameId" : 1,
                "userId" : 2
            }*/
            handleSkipTurn(action);
    }
    sendStateGame(action.gameId)
}

function sendStateGame(gameId){
    let game = getGameByGameId(gameId);
    let state = {
        type: "state_game",
        game: game
    }
    sendMessage(game.gameId, state);
}
function handleSkipTurn(action, attackedUserId){
    let game = getGameByGameId(action.gameId);
    let attacker = game.players.filter(player => player.playerId === attackedUserId);
    let opponent = game.players.filter(player => player.playerId !== attackedUserId);


}
function handleCardChoice(action){
    let userId = action.userId
    let cards = cardService.checkAndGetCards(action.cards, userId);
    addCardsToPlayer(userId, cards);
    updateDeckState(userId);
    checkDeckState(userId);
}

function handleAttack(action){
    let userId = action.userId;
    let game = getGameByGameId(action.gameId);
    let attacker = game.players.filter(player => player.playerId === userId);
    let opponent = game.players.filter(player => player.playerId !== userId);
    updateCardState(game, opponent, action.cardTo, attack(attacker, action.cardFrom));

    if(opponent.cards.length > 0){
        nextTurn(game, attacker.userId);
    }else{
        handleGameFinished(action.gameId, attacker.userId)
    }

}

function nextTurn(game, attacker, opponent){
    attacker.actionPoints = attacker.actionPoints - 1;
    if(attacker.actionPoints > 0){
        askToAttack(game.gameId, attacker.userId);
    }else{
        attacker.actionPoints = ACTION_POINTS;
        askToAttack(game.gameId, opponent.userId);
    }
}

function askForCardsChoice(gameId){
    let getCardsRequest = {
        type: "cards_choice",
        number: 3
    }
    sendMessage(gameId,"gameClient",getCardsRequest);
}

function startGame(gameId){
    setPlayerActionPoints(ACTION_POINTS)
    askForCardsChoice(gameId);
}
function setPlayerActionPoints(actionPoints, gameId) {
    let game = getGameByPlayerId(userId);
    game.players.forEach(player => {
        player.actionPoints = actionPoints;
    })
}

function updateDeckState(userId){
    let game = getGameByPlayerId(userId);
    game.steps.card_choice.push(userId);
}

function checkDeckState(userId){
    let game = getGameByPlayerId(userId);
    if (game.steps.card_choice.length === 2){
        let startUserId = game.steps.card_choice[0];
        startFight(game, startUserId)
    }
}

function startFight(game, startUserId) {
    sendStateGame(game.gameId);
    askToAttack(game.gameId, startUserId);
}

function askToAttack(gameId, attackerUserId){
    let attackRequest = {
        type: "attack_turn",
        user_id: attackerUserId
    }
    sendMessage(gameId, attackRequest);
}

function handleGameFinished(game, winnerId){
    sendMessage(game, "roommessage", `User ${winnerId} won the game !`);
    removeGame(game);
}

module.exports = {joinPlayer};
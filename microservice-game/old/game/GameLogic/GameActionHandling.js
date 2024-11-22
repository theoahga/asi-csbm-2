const {getGameByGameId, addCardsToPlayer, getGameByPlayerId, removeGame} = require("../Games.js");
const {checkAndGetCards, updateCardState} = require("../../back-communication/card/CardService.js");
const {sendCardsChoiceRequest, sendGameState, sendAttackTurnRequest, sendMessageToPlayers} = require("./GameCommunication.js");
const {updateDeckState, checkDeckState} = require("./GameDeckManager.js");

const ACTION_POINTS = 2;

function startGame(gameId) {
    setPlayerActionPoints(ACTION_POINTS, gameId);
    sendCardsChoiceRequest(gameId);
}

function setPlayerActionPoints(actionPoints, gameId) {
    const game = getGameByGameId(gameId);
    game.players.forEach(player => (player.actionPoints = actionPoints));
}

/* Action Handling */

function handlePlayerAction(action) {
    switch (action.type) {
        case "cards_choice":
            handleCardChoice(action);
            break;
        case "attack":
            handleAttack(action);
            break;
        case "skipturn":
            handleSkipTurn(action);
            break;
    }
    sendGameState(action.gameId);
}

function handleCardChoice(action) {
    const userId = action.userId;
    const cards = checkAndGetCards(action.cards, userId);
    addCardsToPlayer(userId, cards);
    updateDeckState(userId);
    let firstPlayer = checkDeckState(userId);
    if(firstPlayer){
        handleFightStart(getGameByPlayerId(userId), firstPlayer)
    }
}

function handleFightStart(game, startUserId) {
    sendGameState(game.gameId);
    sendAttackTurnRequest(game.gameId, startUserId);
}

function handleAttack(action) {
    const { userId, gameId, cardFrom, cardTo } = action;
    const game = getGameByGameId(gameId);

    const attacker = game.players.find(player => player.playerId === userId);
    const opponent = game.players.find(player => player.playerId !== userId);

    let cardAttack = attack(attacker, cardFrom);
    updateCardState(game, opponent, cardTo, cardAttack);

    if (opponent.cards.length > 0) {
        handleNextTurn(game, attacker.userId);
    } else {
        handleGameFinished(gameId, attacker.userId);
    }
}

function handleNextTurn(game, attacker, opponent){
    attacker.actionPoints = attacker.actionPoints - 1;
    if(attacker.actionPoints > 0){
        sendAttackTurnRequest(game.gameId, attacker.userId);
    }else{
        attacker.actionPoints = ACTION_POINTS;
        sendAttackTurnRequest(game.gameId, opponent.userId);
    }
}

function handleSkipTurn(action) {
    const game = getGameByGameId(action.gameId);
    const currentPlayer = game.players.find(player => player.playerId === action.userId);
    const opponent = game.players.find(player => player.playerId !== action.userId);

    currentPlayer.actionPoints += ACTION_POINTS;
    sendAttackTurnRequest(game.gameId, opponent.playerId);
}

function handleGameFinished(gameId, winnerId) {
    const winnerMessage = {
        type: "finished",
        winnerUserId: winnerId,
        message: `User ${winnerId} won the game!`,
    };
    sendMessageToPlayers(gameId, winnerMessage);
    removeGame(gameId);
}

function attack(user, cardFromId){
    user.cards.forEach((card) => {
        if(card.id === cardFromId){
            return cardFrom.attack
        }
        else{
            throw new Error("The selected card is not in your deck")
        }
    })
    return null;
}

module.exports = {startGame, handlePlayerAction}
const {getGameByGameId} = require("../Games.js");
const {sendMessage} = require("../../Socket");

function sendCardsChoiceRequest(gameId) {
    const request = {
        type: "cards_choice",
        numberOfCardsToSelect: 3,
    };
    sendMessageToPlayers(gameId, request);
}

function sendGameState(gameId) {
    const game = getGameByGameId(gameId);
    const state = {
        type: "state_game",
        game,
    };
    sendMessageToPlayers(gameId, state);
}

function sendMessageToPlayers(gameId, message) {
    sendMessage(gameId, "gameClient", message);
}

function sendAttackTurnRequest(gameId, attackerUserId){
    let attackRequest = {
        type: "attack_turn",
        user_id: attackerUserId
    }
    sendMessageToPlayers(gameId, attackRequest);
}

module.exports = {sendCardsChoiceRequest, sendGameState, sendMessageToPlayers, sendAttackTurnRequest}
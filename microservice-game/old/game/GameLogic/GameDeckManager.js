const {getGameByPlayerId} = require("../Games.js");

function updateDeckState(userId){
    let game = getGameByPlayerId(userId);
    game.steps.card_choice.push(userId);
}

function checkDeckState(userId){
    let game = getGameByPlayerId(userId);
    if (game.steps.card_choice.length === 2) {
        return game.steps.card_choice[0];
    }
    return null;
}

module.exports = {updateDeckState, checkDeckState}
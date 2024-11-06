const currentGame = new Map();

function addGame(gameId,playerId) {
    let players = [playerId]
    currentGame.set(gameId, players);
}

function removeGame(gameId) {
    currentGame.delete(gameId);
}

function getGamePlayersByGameId(gameId) {
    return currentGame.get(gameId);
}

function addPlayerToGame(gameId, playerId) {
    let gamePlayers = getGamePlayersByGameId(gameId);
    gamePlayers.push(playerId);
    currentGame.set(gameId, gamePlayers);
}

function getNextGameID(){
    return "game-" + (currentGame.size + 1);
}

module.exports = {
    addGame,
    removeGame,
    getGamePlayersByGameId,
    addPlayerToGame,
    getNextGameID
};

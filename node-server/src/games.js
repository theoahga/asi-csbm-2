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

function getGamesByPlayerId(playerId) {
    let gameIds = []
    currentGame.forEach((players,gameId) => {
        if(players.includes(playerId)){
            gameIds.push(gameId);
        }
    })
    return gameIds;
}

function isPlayerIdAloneInGame(playerId,gameId){
    let gamePlayers = currentGame.get(gameId);
    if(gamePlayers.includes(playerId) && gamePlayers.length === 1){
        return true;
    }
    return false;
}

function removeIfPlayerIsAloneInGames(playerId){
   let gameIds = getGamesByPlayerId(playerId);
   gameIds.forEach(gameId => {
       if(isPlayerIdAloneInGame(playerId,gameId)){
           removeGame(gameId);
       }
   })
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
    getNextGameID,
    removeIfPlayerIsAloneInGames
};

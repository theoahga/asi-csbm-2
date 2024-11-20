const currentGame = new Map();


const defaultSteps = {
    card_choice : []
}

function addGame(gameId,playerId) {
    let game = {
        gameId: gameId,
        steps: defaultSteps,
        players: [
            { playerId: playerId }
        ]
    }
    currentGame.set(gameId, game);
}

function removeGame(gameId) {
    currentGame.delete(gameId);
}

function getGameByGameId(gameId) {
    return currentGame.get(gameId);
}

function getGameByPlayerId(playerId) {
    const games = [];
    currentGame.forEach((game, gameId) => {
        const playerExists = game.players.some(player => player.playerId === playerId);
        if (playerExists) {
            games.push(game);
        }
    });

    if (games.length === 0) {
        console.log("Player isn't in a game");
        return null;
    }
    if (games.length > 1){
        console.log("Player is in few games... Something is wrong!")
        return null;
    }

    return games[0];
}

function isPlayerIdAloneInGame(playerId,gameId){
    let game = currentGame.get(gameId);
    return !!(game.players.some(player => player.playerId === playerId) && game.players.length === 1);
}

function removeIfPlayerIsAloneInGames(playerId){
   let gameIds = getGameByPlayerId(playerId);
   gameIds.forEach(gameId => {
       if(isPlayerIdAloneInGame(playerId,gameId)){
           removeGame(gameId);
       }
   })
}

function addPlayerToGame(gameId, playerId) {
    let game = getGameByGameId(gameId);
    game.players.push({playerId : playerId});
    currentGame.set(gameId, game);
}

function getNextGameID(){
    return "game-" + (currentGame.size + 1);
}

function addCardsToPlayer(playerId, cards){
    let game = getGamesByPlayerId(playerId);
    if(game.players.some(player => player.playerId === playerId)) {
        let player = game.players.find(player => player.playerId === playerId);
        player.cards = cards;
    }
}

module.exports = {
    addGame,
    removeGame,
    getGameByGameId,
    addPlayerToGame,
    getNextGameID,
    removeIfPlayerIsAloneInGames,
    addCardsToPlayer,
    getGameByPlayerId
};

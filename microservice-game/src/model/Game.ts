import Player from "./Player";

class Game {
    private _gameId: string;
    private _players: Player[];

    constructor(gameId: string) {
        this._gameId = gameId;
        this._players = [];
    }

    addPlayer(playerId: string): void {
        this._players.push(new Player(playerId));
    }

    get gameId(): string {
        return this._gameId;
    }

    get players(): Player[] {
        return this._players;
    }

    set players(value: Player[]) {
        this._players = value;
    }
}

export default Game;
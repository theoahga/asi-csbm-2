import Player from "./Player";

class Game {
    private readonly _gameId: string;
    private _players: Player[];
    private _readyPlayerIds: number[];

    constructor(gameId: string) {
        this._gameId = gameId;
        this._players = [];
        this._readyPlayerIds = [];
    }

    addPlayer(playerId: number): void {
        this._players.push(new Player(playerId));
    }

    addReadyPlayer(readyPlayerId: number): void {
        this._readyPlayerIds.push(readyPlayerId);
    }

    arePlayersReady(): boolean {
        return this._readyPlayerIds.length === this._players.length;
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
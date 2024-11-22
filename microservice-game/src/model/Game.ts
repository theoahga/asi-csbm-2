import Player from "./Player";
import Card from "./Card";

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

    getCardById(cardId: number): Card | undefined {
        for (const player of this._players) {
            const card = player.cards.find(c => c.id === cardId);
            if (card) {
                return card;
            }
        }
        return undefined;
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

    randomPlayer(): Player | undefined {
        if (this._players.length === 0) {
            return undefined;
        }
        const randomIndex = Math.floor(Math.random() * this._players.length);
        return this._players[randomIndex];
    }
}

export default Game;
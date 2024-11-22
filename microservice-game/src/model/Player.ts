import Card from "./Card";

class Player {
    private _playerId: number;
    private _actionPoints: number;
    private _cards: Card[];

    constructor(playerId: number) {
        this._playerId = playerId;
        this._actionPoints = 0;
        this._cards = [];
    }

    get playerId(): number {
        return this._playerId;
    }

    get actionPoints(): number {
        return this._actionPoints;
    }

    set actionPoints(value: number) {
        this._actionPoints = value;
    }

    get cards(): Card[] {
        return this._cards;
    }

    set cards(value: Card[]) {
        this._cards = value;
    }
}

export default Player;
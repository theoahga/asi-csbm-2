import Card from "./Card";

const ACTIONS_POINTS = 2

class Player {
    private readonly _playerId: number;
    private _actionPoints: number;
    private _cards: Card[];

    constructor(playerId: number) {
        this._playerId = playerId;
        this._actionPoints = ACTIONS_POINTS;
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

    removeCard(id: number) {
        this._cards = this._cards.filter(card => card.id !== id);
    }

    resetActionPoints() {
        this._actionPoints = ACTIONS_POINTS;
    }
}

export default Player;
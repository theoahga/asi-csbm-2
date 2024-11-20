import PlayerActionType from "./PlayerActionType";

class PlayerAction {
    private readonly _type: PlayerActionType;
    private readonly _gameId: string;
    private readonly _userId: string;
    private readonly _cardIds: number[];

    constructor(type: PlayerActionType, gameId: string, userId: string, cardIds: number[]) {
        this._type = type;
        this._gameId = gameId;
        this._userId = userId;
        this._cardIds = cardIds;
    }

    get type(): PlayerActionType {
        return this._type;
    }

    get gameId(): string {
        return this._gameId;
    }

    get userId(): string {
        return this._userId;
    }

    get cardIds(): number[] {
        return this._cardIds;
    }
}

export default PlayerAction;
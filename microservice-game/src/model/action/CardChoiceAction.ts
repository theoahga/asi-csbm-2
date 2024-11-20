import PlayerAction from "./PlayerAction";
import PlayerActionType from "./PlayerActionType";

const TYPE : PlayerActionType = PlayerActionType.CARDS_CHOICE;

export class CardChoiceAction extends PlayerAction{
    constructor(gameId: string, userId: string) {
        super(TYPE, gameId, userId);
    }
}
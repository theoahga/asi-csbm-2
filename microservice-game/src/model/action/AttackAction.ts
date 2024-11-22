import PlayerAction from "./PlayerAction";
import PlayerActionType from "./PlayerActionType";

const TYPE : PlayerActionType = PlayerActionType.ATTACK;

export class AttackAction extends PlayerAction{
    constructor(gameId: string, userId: string) {
        super(TYPE, gameId, userId);
    }
}
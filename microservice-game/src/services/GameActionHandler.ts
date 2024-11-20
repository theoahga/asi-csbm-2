import Game from "../model/Game";
import PlayerAction from "../model/action/PlayerAction";
import PlayerActionType from "../model/action/PlayerActionType";
import {CardChoiceAction} from "../model/action/CardChoiceAction";
import CardService from "./CardService";
import Card from "../model/Card";

class GameActionHandler{
    private _cardService: CardService;

    constructor() {
        this._cardService = new CardService();
    }

    async handleAction(action: PlayerAction, game: Game) : Promise<Game>{
        switch (action.type) {
            case PlayerActionType.CARDS_CHOICE:
                return await this.handleCardChoice(action, game);
            case PlayerActionType.ATTACK:
                return await this.handleAttack(action, game);
            case PlayerActionType.SKIP_TURN:
                return await this.handleSkipTurn(action, game);
        }
    }

    private async handleCardChoice(action: PlayerAction, game: Game) : Promise<Game>{
        let cardChoiceAction: CardChoiceAction = action;
        let userId = action.userId;

        let cards : Card[] = await this._cardService.checkAndGetCards(cardChoiceAction.cardIds, userId);

        addCardsToPlayer(userId, cards);
        updateDeckState(userId);
        let firstPlayer = checkDeckState(userId);
        if(firstPlayer){
            handleFightStart(getGameByPlayerId(userId), firstPlayer)
        }



        return game;
    }

    private async handleAttack(action: PlayerAction, game: Game) : Promise<Game>{
        return game;
    }

    private async handleSkipTurn(action: PlayerAction, game: Game) : Promise<Game> {
        return game;
    }
}

export default GameActionHandler;
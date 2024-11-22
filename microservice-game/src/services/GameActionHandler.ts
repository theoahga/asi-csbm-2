import PlayerAction from "../model/action/PlayerAction";
import PlayerActionType from "../model/action/PlayerActionType";
import {CardChoiceAction} from "../model/action/CardChoiceAction";
import CardService from "./CardService";
import Card from "../model/Card";
import {GameService} from "./GameService";

class GameActionHandler{
    private _cardService: CardService;
    private _gameService: GameService;

    constructor(gameService: GameService) {
        this._cardService = new CardService();
        this._gameService = gameService;
    }

    async handleAction(action: PlayerAction){
        switch (action.type) {
            case PlayerActionType.CARDS_CHOICE:
                await this.handleCardChoice(action);
            case PlayerActionType.ATTACK:
                await this.handleAttack(action);
            case PlayerActionType.SKIP_TURN:
                await this.handleSkipTurn(action);
        }
    }

    private async handleCardChoice(action: PlayerAction){
        let cardChoiceAction: CardChoiceAction = action;
        let userId = action.userId;
        let gameId = action.gameId;

        let cards : Card[] = await this._cardService.checkAndGetCards(cardChoiceAction.cardIds, userId);

        await this._gameService.addCardsToPlayer(gameId, userId, cards);
        await this._gameService.setPlayerReady(gameId, userId);

        if(await this._gameService.arePlayersReady(gameId)){
            await this.handleFightStart(gameId);
        }
    }

    private async handleAttack(action: PlayerAction){

    }

    private async handleSkipTurn(action: PlayerAction){

    }

    private async handleFightStart(gameId: string) {


        sendGameState(game.gameId);
        sendAttackTurnRequest(game.gameId, startUserId);
    }
}

export default GameActionHandler;
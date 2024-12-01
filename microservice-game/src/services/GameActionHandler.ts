import PlayerAction from "../model/action/PlayerAction";
import PlayerActionType from "../model/action/PlayerActionType";
import {CardChoiceAction} from "../model/action/CardChoiceAction";
import CardService from "./CardService";
import Card from "../model/Card";
import {GameService} from "./GameService";
import {AttackAction} from "../model/action/AttackAction";
import Game from "../model/Game";
import Player from "../model/Player";
import {SkipTurnAction} from "../model/action/SkipTurnAction";

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
                break;
            case PlayerActionType.ATTACK:
                await this.handleAttack(action);
                break;
            case PlayerActionType.SKIP_TURN:
                await this.handleSkipTurn(action);
                break;
        }
    }

    private async handleCardChoice(action: PlayerAction){
        let cardChoiceAction: CardChoiceAction = action as CardChoiceAction;
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
        let attackAction: AttackAction = action as AttackAction;
        let game = await this._gameService.getGameById(attackAction.gameId);
        if (game){
            let attacker = game.players.find(p=>p.playerId === attackAction.userId);
            let opponent = game.players.find(p=>p.playerId !== attackAction.userId);

            let cardFrom = game.getCardById(attackAction.cardFrom);
            let cardTo = game.getCardById(attackAction.cardTo);

            if(cardFrom && cardTo && attacker && opponent){
                if(attacker.actionPoints == 0){
                    throw new Error("Player can't play with no action points")
                }else{
                    attacker.actionPoints -= 1;
                }

                await this._cardService.attack(cardFrom, cardTo);

                if (cardTo.hp <= 0){
                    opponent.removeCard(cardTo.id);
                }

                let newGameState = await this._gameService.saveGame(game);
                if(!await this._gameService.isGameFinish(newGameState)){
                    if(attacker.actionPoints == 0){
                        attacker.resetActionPoints()
                        await this._gameService.nextTurn(game, opponent.playerId);
                    }else{
                        await this._gameService.nextTurn(game, attacker.playerId);
                    }
                }
            }else{
                throw new Error("Something went wrong during the card and user extraction");
            }
        }else{
            throw new Error("No game found for gameid: " + action.gameId);
        }
    }

    private async handleSkipTurn(action: PlayerAction){
        let skipturn: SkipTurnAction = action as SkipTurnAction;
        let game = await this._gameService.getGameById(skipturn.gameId);
        if (game) {
            let attacker = game.players.find(p => p.playerId === skipturn.userId);
            let opponent = game.players.find(p => p.playerId !== skipturn.userId);
            if(attacker && opponent){
                attacker.resetActionPoints();
                await this._gameService.nextTurn(game, opponent.playerId);
            }else{
                throw new Error("Something went wrong during the user extraction");
            }
        }else{
            throw new Error("No game found for gameid: " + action.gameId);
        }
    }

    private async handleFightStart(gameId: string) {
        let game = await this._gameService.getGameById(gameId);
        if (game) {
            let startPlayer = game.randomPlayer();
            if (startPlayer){
                await this._gameService.nextTurn(game, startPlayer.playerId);
            }
        }else {
            throw new Error("No game found for gameid: " + gameId);
        }

    }
}

export default GameActionHandler;
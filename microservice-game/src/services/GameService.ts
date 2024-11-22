import IStorage from "../storage/IStorage.js";
import Game from "../model/Game.js";
import InMemoryStorage from "../storage/InMemoryStorage";
import Card from "../model/Card";
import WebSocketCommunicator from "../communicator/WebSocketCommunicator";
import CardChoiceMessage from "../communicator/dto/CardChoiceMessage";
import GameStateMessage from "../communicator/dto/GameStateMessage";
import FinishMessage from "../communicator/dto/FinishMessage";
import TurnMessage from "../communicator/dto/TurnMessage";

export class GameService {
    private _gameStorage: IStorage<Game>;
    private _webSocketCommunicator: WebSocketCommunicator;

    constructor() {
        this._gameStorage = new InMemoryStorage<Game>();
        this._webSocketCommunicator = new WebSocketCommunicator();
    }

    async createGame(playerId: number): Promise<string> {
        if(!await this.findGameForPlayer(playerId)){
            let gameId: string = await this.getNextGameID();
            let game: Game = new Game(gameId);
            await this._gameStorage.set(gameId, game);
            return gameId;
        }
        return "";
    }

    async getNextGameID(){
        let numberOfGames: number = await this._gameStorage.size();
        return "game-" + (numberOfGames + 1);
    }

    async findGameForPlayer(playerId: number) {
        for (let game of await this._gameStorage.getValues()) {
            if (game.players.some(player => player.playerId === playerId)) {
                return game;
            }
        }
        return null;
    }

    async findWithOnePlayer(): Promise<string>{
        for (let game of await this._gameStorage.getValues()) {
            if (game.players.length === 1) {
                return game.gameId;
            }
        }
        return "";
    }

    async addPlayerToGame(gameId: string, playerId: number) {
        let game = await this.getGameById(gameId);
        if (game && game.players.length === 2 && !game.players.find(player => player.playerId === playerId)) {
            game.addPlayer(playerId);
            await this._gameStorage.set(gameId, game);
            await this.requestCardChoice(gameId);
        }else{
            throw new Error("No game found for gameId " + gameId);
        }
    }

    async doesGameExist(gameId: string) : Promise<boolean> {
        return !!(await this._gameStorage.get(gameId));
    }

    async getGameById(gameId: string) : Promise<Game | undefined>{
        return await this._gameStorage.get(gameId);
    }

    async addCardsToPlayer(gameId: string, userId: number, cards: Card[]){
        let game = await this.getGameById(gameId);
        if (game){
            let player = game.players.find(player => player.playerId === userId)
            if (player){
                player.cards.push(...cards);
                await this._gameStorage.set(game.gameId, game);
            }else{
                throw new Error("No user found for userId " + userId + " in the game " + game.gameId);
            }
        }else{
            throw new Error("No game found for gameId " + gameId);
        }
    }

    async update(gameId: string, newGameState: Game) {
        return await this._gameStorage.set(gameId, newGameState);
    }

    async setPlayerReady(gameId: string, userId: number) {
        let game = await this.getGameById(gameId);
        if (game){
            game.addReadyPlayer(userId);
            await this._gameStorage.set(gameId, game);
        }else {
            throw new Error("No game found for gameId " + gameId);
        }
    }

    async arePlayersReady(gameId: string) {
        let game = await this.getGameById(gameId);
        if (game){
            return game.arePlayersReady();
        }else {
            throw new Error("No game found for gameId " + gameId);
        }
    }

    private async requestCardChoice(gameId: string) {
        let game = await this.getGameById(gameId);
        if (game){
            let cardChoiceRequest = new CardChoiceMessage();
            for (let player of game.players) {
                await this._webSocketCommunicator.sendMessage(player.playerId, "game", cardChoiceRequest)
            }
        }else{
            throw new Error("No game found for gameId " + gameId);
        }
    }

    async notifyGameState(gameId: string) {
        let game = await this.getGameById(gameId);
        if (game){
            let gameStateMessage = new GameStateMessage(game);
            for (let player of game.players) {
                await this._webSocketCommunicator.sendMessage(player.playerId, "game", gameStateMessage)
            }
        }else{
            throw new Error("No game found for gameId " + gameId);
        }
    }

    async saveGame(game: Game): Promise<Game>{
        await this._gameStorage.set(game.gameId, game);
        return game
    }

    async isGameFinish(game: Game) {
        let looser = game.players.find(p => p.cards.length === 0)
        if(looser){
            let winner = game.players.find(p => p.playerId !== looser?.playerId);
            if(winner){
                let finishMessage: FinishMessage = new FinishMessage(game, winner.playerId , looser.playerId);
                for (let player of game.players) {
                    await this._webSocketCommunicator.sendMessage(player.playerId, "game", finishMessage);
                }
                return true;
            } else {
                throw new Error("It seems there is no winner");
            }
        }
        return false;
    }

    async nextTurn(game: Game,playerId: number) {
        let turnMessage: TurnMessage = new TurnMessage(playerId);
        for (let player of game.players) {
            await this._webSocketCommunicator.sendMessage(player.playerId, "game", turnMessage);
        }
    }
}

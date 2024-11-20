import IStorage from "../storage/IStorage.js";
import Game from "../model/Game.js";
import InMemoryStorage from "../storage/InMemoryStorage";
import Player from "../model/Player";
import PlayerAction from "../model/action/PlayerAction";
import GameActionHandler from "./GameActionHandler";

export class GameService {
    private _gameStorage: IStorage<Game>;
    private _gameActionHandler: GameActionHandler;

    constructor() {
        this._gameStorage = new InMemoryStorage<Game>();
        this._gameActionHandler = new GameActionHandler();
    }

    async createGame(playerId: string): Promise<string> {
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

    async findGameForPlayer(playerId: string) {
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

    async addPlayerToGame(gameId: string, playerId: string) {
        let game = await this.getGameById(gameId);
        if (game && game.players.length === 2 && !game.players.find(player => player.playerId === playerId)) {
            let newPlayer: Player = new Player(playerId);
            game.players.push(newPlayer);
            await this._gameStorage.set(gameId, game);
        }else{
            throw new Error("No game found for gameId " + gameId);
        }
    }

    async doesGameExist(gameId: string) : Promise<boolean> {
        return !!(await this._gameStorage.get(gameId));
    }

    private async getGameById(gameId: string) : Promise<Game | undefined>{
        return await this._gameStorage.get(gameId);
    }

    async handleAction(action: PlayerAction, gameId: string){
        let game = await this.getGameById(gameId)
        if (game){
            let newGameState: Game = await this._gameActionHandler.handleAction(action);
            await this._gameStorage.set(gameId, newGameState);
            notifyGamePlayersOfTheNewState();
        }else{
            throw new Error("No game found for gameId " + gameId);
        }
    }
}

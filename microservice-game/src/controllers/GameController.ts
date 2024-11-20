import { GameService } from '../services/GameService';
import PlayerAction from "../model/action/PlayerAction";

class GameController {
    private _gameService: GameService;

    constructor() {
        this._gameService = new GameService();
    }

    public async joinPlayer(req : any, res : any) {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        try {
            console.log(`User ${userId} is trying to find a game`);
            const gameId = await this._gameService.findWithOnePlayer();

            if (gameId) {
                await this._gameService.addPlayerToGame(gameId, userId);
                return res.status(200).json({ message: `User ${userId} has joined game ${gameId}` });
            } else {
                let newGameId = await this._gameService.createGame(userId);
                return res.status(201).json({ message: `User ${userId} has created a new game with ID ${newGameId}` });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error', stack: error});
        }
    }

    // static async startGame(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
    //     const { gameId } = req.params;
    //     if (!gameId) {
    //         return res.status(400).json({ error: 'Game ID is required' });
    //     }
    //
    //     try {
    //         const gameService = new GameService();
    //         const game = await gameService.getGameById(gameId);
    //
    //         if (!game) {
    //             return res.status(404).json({ error: "Game not found" });
    //         }
    //
    //         const gameLogic = new GameLogic();
    //         await gameLogic.startGame(gameId);
    //         return res.status(200).json({ message: `Game ${gameId} has started` });
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }
    // }

    public async handlePlayerAction(req: any, res: any) {
        const { gameId } = req.params;
        const action: PlayerAction = req.body;
        if (!gameId || !action) {
            return res.status(400).json({ error: 'Game ID and action are required' });
        }

        try {
            if (!(await this._gameService.doesGameExist(gameId))) {
                return res.status(404).json({ error: "Game not found" });
            }

            await this._gameService.handleAction(action, gameId);
            return res.status(200).json({ message: "Action processed" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default GameController;

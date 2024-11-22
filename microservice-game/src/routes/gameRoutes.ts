import express, { Request, Response } from 'express';
import GameController from "../controllers/GameController";
import Game from "../model/Game";
import IStorage from "../storage/IStorage";

const router = express.Router();
const gameController = new GameController();

router.post('/join', (req, res) => {
    return gameController.joinPlayer(req, res);
});

router.post('/:gameId/action', (req: Request, res: Response) => gameController.handlePlayerAction(req, res));

export default router;

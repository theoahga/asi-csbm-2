import { GameService } from '../services/GameService.ts';

export class GameLogic {
    async startGame(gameId) {
        const gameService = new GameService();
        const game = await gameService.getGameById(gameId);
        if (!game) throw new Error("Game not found");

        console.log(`Starting game: ${gameId}`);
        game.players.forEach(player => player.actionPoints = 2);

        sendGameState(gameId);
    }

    async handleAction(action, gameId) {
        const gameService = new GameService();
        const game = await gameService.getGameById(gameId);
        if (!game) throw new Error("Game not found");

        switch (action.type) {
            case "cards_choice":
                this.handleCardChoice(action, game);
                break;
            case "attack":
                this.handleAttack(action, game);
                break;
            case "skipturn":
                this.handleSkipTurn(action, game);
                break;
            default:
                throw new Error("Unknown action type");
        }

        sendGameState(gameId);
    }

    handleCardChoice(action, game) {
        console.log(`Player ${action.userId} has chosen cards: ${action.cards}`);
    }

    handleAttack(action, game) {
        console.log(`Player ${action.userId} is attacking with card: ${action.cardFrom}`);
    }

    handleSkipTurn(action, game) {
        console.log(`Player ${action.userId} is skipping their turn`);
    }
}

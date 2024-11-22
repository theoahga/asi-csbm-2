import Game from "../../model/Game";
import MessageType from "./MessageType";

class GameStateMessage {
    private readonly type: MessageType;
    private readonly game: Game;

    constructor(game: Game) {
        this.type = MessageType.GAME_STATE;
        this.game = game;
    }

}

export default GameStateMessage;
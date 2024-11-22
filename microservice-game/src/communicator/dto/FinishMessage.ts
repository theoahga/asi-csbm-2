import Game from "../../model/Game";
import MessageType from "./MessageType";

class FinishMessage {
    private readonly type: MessageType;
    private readonly winner: number;
    private readonly looser: number;
    private readonly game: Game;

    constructor(game: Game, winner: number, looser: number) {
        this.type = MessageType.FINISH;
        this.game = game;
        this.winner = winner;
        this.looser = looser;
    }
}

export default FinishMessage;
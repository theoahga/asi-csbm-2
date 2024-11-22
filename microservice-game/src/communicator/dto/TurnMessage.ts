import MessageType from "./MessageType";

class TurnMessage {
    private readonly type: MessageType;
    private readonly userId: number;

    constructor(userId: number) {
        this.type = MessageType.NEXT_TURN;
        this.userId = userId;
    }

}

export default TurnMessage;
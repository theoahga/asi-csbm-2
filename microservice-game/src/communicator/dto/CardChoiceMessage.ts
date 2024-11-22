import MessageType from "./MessageType";

class CardChoiceMessage {
    private readonly type: MessageType;
    private readonly numberOfCardsToSelect: number;

    constructor() {
        this.type = MessageType.CARD_CHOICE;
        this.numberOfCardsToSelect = 3
    }
}

export default CardChoiceMessage;
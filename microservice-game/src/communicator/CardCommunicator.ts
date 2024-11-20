import Card from "../model/Card";

const BASE_URL = process.env.BACK_API_BASE_URL || "local";

class CardCommunicator extends MicroserviceCommunicator{

    constructor() {
        super(BASE_URL);
    }

    async getCardById(cardId: number): Promise<Card | undefined> {
        return await this.sendGetRequest("/card/" + cardId);
    }
}

export default CardCommunicator;
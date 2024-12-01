import Card from "../model/Card";
import RestServiceCommunicator from "./RestServiceCommunicator";

const BASE_URL: string = process.env.BACK_API_BASE_URL ?? "http://localhost:8081/api";

class CardCommunicator extends RestServiceCommunicator{

    constructor() {
        super(BASE_URL);
    }

    async getCardById(cardId: number): Promise<Card | undefined> {
        return await this.sendGetRequest("/card/" + cardId);
    }
}

export default CardCommunicator;
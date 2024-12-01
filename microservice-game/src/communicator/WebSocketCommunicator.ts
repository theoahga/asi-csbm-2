import Card from "../model/Card";
import RestServiceCommunicator from "../communicator/RestServiceCommunicator"

const BASE_URL: string = process.env.BACK_API_BASE_URL ?? "http://localhost:3000/api/users";

class WebSocketCommunicator extends RestServiceCommunicator{


    constructor() {
        super(BASE_URL);
    }

    async sendMessage(userId: number, eventId: string, object: any): Promise<Card | undefined> {
        let url ="/" + userId + "/message/" + eventId;
        return await this.sendPostRequest(url, object);
    }
}

export default WebSocketCommunicator;
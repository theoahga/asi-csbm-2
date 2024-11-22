import Card from "../model/Card";
import Player from "../model/Player";
import CardCommunicator from "../communicator/CardCommunicator";

class CardService {
    private _CardCommunicator: CardCommunicator;

    constructor() {
        this._CardCommunicator = new CardCommunicator();
    }

    async checkAndGetCards(cardIds: number[], userId: number){
        let cards: Card[] = []

        for (const cardId of cardIds) {
            let card = await this._CardCommunicator.getCardById(cardId);
            if (card){
                if(card.userId === userId){
                    cards.push(card);
                }else{
                    throw new Error("The selected card is not yours")
                }
            }else{
                throw new Error("No card was found for cardId " + cardId)
            }
        }

        return cards;
    }

    async updateCardState(player: Player, cardId: number, damage: number){
        for (const card of player.cards) {
            if(card.id === cardId){
                let newHp = card.hp - damage;
                if(newHp > 0){
                    card.hp = newHp;
                }else {
                    player.cards = player.cards.filter(c=> c.id !== card.id );
                }
            }
        }
    }
}

export default CardService;
const monoService = require("../MonoFacade");

function checkAndGetCards(cardIds,userId){
    let cards = []
    cardIds.forEach((id) => {
        let card = getCardById(id)
        if(card.userId !== userId){
            throw new Error("The selected card is not yours")
        }else{
            cards.push(card);
        }
    })
    return cards;
}

function updateCardState(user, cardId, damage){
    user.cards.forEach((card) => {
        if(card.id === cardId){
            if(card.hp > 0){
                card.hp = card.hp - damage;
            }else {
                user.cards.remove(cardId);
            }
        }
    })
}

async function getCardById(id) {
    return await monoService.get("/api/card/"+id)
}

module.exports = {
    checkAndGetCards,
    updateCardState
}
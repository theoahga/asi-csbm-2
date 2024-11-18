const monoService = require("../monoService");

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

async function getCardById(id) {
    return await monoService.get("/api/card/"+id)
}

module.exports = {
    checkAndGetCards
}
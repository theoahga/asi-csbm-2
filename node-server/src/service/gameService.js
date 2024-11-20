function attack(user, cardFromId){
    user.cards.forEach((card) => {
        if(card.id === cardFromId){
            return cardFrom.attack
        }
        else{
            throw new Error("The selected card is not in your deck")
        }
    })
}

module.exports = { attack }
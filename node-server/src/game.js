const {openGame} = require("./socket");
let waitingPlayer = null;

function queueManager(req,res){
    if(waitingPlayer){
        const gameSessionId = `${waitingPlayer.id}-${req.body.id}`;
        res.send({message: `Match found : ${gameSessionId}`});
        openGame(waitingPlayer,req,gameSessionId);

        waitingPlayer = null;
    }else{
        waitingPlayer = { id: req.body.id, socketId: req.body.socketId };
        res.send({ message: 'Waiting for an opponent...' });
    }
}

module.exports = {queueManager};
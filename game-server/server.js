const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let waitingPlayer = null;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Serveur en ligne !');
});

app.post('/api/matchmaking/join', (req, res) => {
    if (waitingPlayer) {
        const gameSessionId = `${waitingPlayer.id}-${req.body.id}`;
        res.send({message: `Match found : ${gameSessionId}`});
        io.to(waitingPlayer.socketId).emit('matchFound', { opponentId: req.body.id, gameSessionId });
        io.to(req.body.socketId).emit('matchFound', { opponentId: waitingPlayer.id, gameSessionId });

        waitingPlayer = null;
    } else {
        waitingPlayer = { id: req.body.id, socketId: req.body.socketId };
        res.send({ message: 'Waiting for an opponent...' });
    }
});


server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
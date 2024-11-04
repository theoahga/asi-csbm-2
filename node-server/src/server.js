const express = require('express');
const http = require('http');
const cors = require('cors');
const initSocket = require('./socket');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use('/', routes);
app.use(express.json());

initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
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

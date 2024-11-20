const express = require('express');
const http = require('http');
const cors = require('cors');
const socket = require('./Socket');
const routes = require('./Routes');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/", routes);

socket.initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

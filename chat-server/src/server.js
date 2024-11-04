const express = require('express');
const http = require('http');
const cors = require('cors');
const initSocket = require('./socket');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use('/', routes);

initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

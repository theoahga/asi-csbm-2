const express = require('express');
const http = require('http');
const cors = require('cors');
const routes = require('./Routes.js');
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/', routes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import socketService from './services/SocketService.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Autorise toutes les origines (ou spécifiez les URL autorisées)
        methods: ['GET', 'POST'], // Méthodes HTTP autorisées
    },
});

app.use(express.json());
app.use('/api/users', userRoutes);

socketService.init(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

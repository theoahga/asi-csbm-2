import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Chat microservice is running on port ${PORT}`);
});

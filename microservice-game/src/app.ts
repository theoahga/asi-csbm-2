import express from 'express';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/games', gameRoutes);

app.listen(port, () => {
    console.log(`Microservice Game running on port ${port}`);
});

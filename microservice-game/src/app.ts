import express from 'express';
import cors from 'cors';
import router from './routes/gameRoutes';

const app = express();
const port = process.env.PORT || 4003;

app.use(cors());
app.use(express.json());

app.use('/api/games', router);

app.listen(port, () => {
    console.log(`Microservice Game running on port ${port}`);
});

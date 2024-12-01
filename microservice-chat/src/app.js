import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import chatRoutes from "./routes/chatRoutes.js";
import cors from "cors"; // N'oubliez pas d'installer cors : npm install cors

dotenv.config();

const app = express();

// Configuration des CORS
app.use(
  cors({
    origin: "*", // URL de votre frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);

// Middleware pour gérer les headers CORS de manière plus détaillée si nécessaire
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Chat microservice is running on port ${PORT}`);
});

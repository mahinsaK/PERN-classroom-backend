import express from "express";
import subjectsRouter from "./db/routes/subjects.js";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json());

app.use('/api/subjects', subjectsRouter)

app.get("/", (_request, response) => {
  response.send("Classroom backend is running.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import userRouter from './routes/userRouter.js';
import recipeRouter from './routes/recipeRouter.js';
import reviewRouter from './routes/reviewRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get('/api', (req, res) => {
  res.json({
    status: 'ok',
    name: 'Recetas Inclusivas API',
    message: 'API REST para gestionar recetas para personas con restricciones alimentarias.',
  });
});

app.use('/api/users', userRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/reviews', reviewRouter);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(chalk.green(`Servidor Web iniciado en http://localhost:${PORT}`));
});

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/index';
import AppError from '../errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// @ts-ignore
app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('SERVER RUNNING! 🏆'));

import express, { Express, Handler } from 'express';
import morgan from 'morgan';
import logger from './utils/logger';
import routerBalanceSheet from './routes/balance-sheet';
import errorHandler from './utils/error-handler';
import { STATUS_CODES } from 'node:http';
import cors from 'cors';
import config from './config';

const app: Express = express();

const morganMiddleware: Handler = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  },
);

app.use(morganMiddleware);
app.use(cors({
  'allowedHeaders': ['Content-Type'],
  'origin': '*',
  'methods': 'GET',
  'credentials': false,
}));

app.use('/api/balance-sheet', routerBalanceSheet);
app.use((req, res, next) => {
  res.status(404).json({
    name: STATUS_CODES[404],
  });
});
app.use(errorHandler);

app.listen(config.apiPort, () => {
  logger.info('Show Me The Money API listening on port: ' + config.apiPort);
});

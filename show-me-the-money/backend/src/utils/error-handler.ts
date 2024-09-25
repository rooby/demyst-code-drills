import { NextFunction, Request, Response } from 'express';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { STATUS_CODES } from 'node:http';

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction): void => {
  let statusCode: number = err?.status || err?.statusCode || 500;
  if (statusCode < 400) {
    statusCode = 500;
  }

  const message: string = (err && typeof err === 'object') ? err.message : String(err);

  res.status(statusCode);
  res.json({
    name: STATUS_CODES[statusCode] || 'Unknown Error',
    message,
  });
};

export default errorHandler;

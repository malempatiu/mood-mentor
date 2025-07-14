import { HttpException } from '@/exceptions/HttpException';
import { Request, Response, NextFunction } from 'express';

export class ErrorMiddleware {
  public static handler = (
    err: HttpException,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  };
}

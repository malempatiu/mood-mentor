import express from 'express';
import cors from 'cors';
import { Controller } from './types/controller';
import { ErrorMiddleware } from './middlewares/ErrorMiddleware';

class App {
  private readonly app = express();
  private readonly path = '/api';
  private readonly controllers: Controller[];
  private readonly port: number;
  constructor({
    controllers,
    port,
  }: {
    controllers: Controller[];
    port: number;
  }) {
    this.controllers = controllers;
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorMiddleware();
  }

  private initializeMiddlewares = () => {
    this.app.use(cors());
    this.app.use(express.json());
  };

  private initializeControllers = () => {
    this.controllers.forEach((controller) => {
      this.app.use(this.path, controller.router);
    });
  };

  private initializeErrorMiddleware = () => {
    this.app.use(ErrorMiddleware.handler);
  };

  public listen = () => {
    if (process.env.NODE_ENV !== 'production') {
      this.app.listen(this.port, () => {
        console.log(`Server listening on port: ${this.port}`);
      });
    }
  };

  public getApp = () => {
    return this.app;
  };
}

export { App };

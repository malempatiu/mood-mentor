import express from 'express';
import { Controller } from './types/controller';

class App {
  private readonly app = express();
  private readonly path = '/';
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
  }

  private initializeMiddlewares = () => {
    this.app.use(express.json());
  };

  private initializeControllers = () => {
    this.controllers.forEach((controller) => {
      this.app.use(this.path, controller.router);
    });
  };

  public listen = () => {
    this.app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server listening on port: ${this.port}`);
    });
  };
}

export { App };

import { HttpException } from './HttpException';

class DBException extends HttpException {
  constructor(status: number, message: string) {
    super(status, message);
  }
}

export { DBException };

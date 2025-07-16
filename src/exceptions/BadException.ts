import { HttpException } from './HttpException';

class BadException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export { BadException };

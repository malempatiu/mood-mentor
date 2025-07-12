import { Request, Response, Router } from 'express';

class MoodSummaryController {
  public readonly path = '/mood-summary';
  public readonly router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getMoodSummary);
  }

  private getMoodSummary = (req: Request, res: Response) => {
    res.json({ message: `user id is: ${req.query.userId}` });
  };
}

export { MoodSummaryController };

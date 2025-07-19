import { BadException } from '@/exceptions/BadException';
import { catchAsync } from '@/lib/catch-async';
import { MoodSummaryServiceI } from '@/services/types';
import { NextFunction, Request, Response, Router } from 'express';

class MoodSummaryController {
  public readonly path = '/mood-summary';
  public readonly router = Router();

  constructor(private moodSummaryService: MoodSummaryServiceI) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, catchAsync(this.getMoodSummary));
  }

  private getMoodSummary = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    const userId = req.query.userId as string;
    if (!userId?.trim().length) {
      throw new BadException('User id is missing!');
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');

    await this.moodSummaryService.getMoodSummaryByUserId(userId, res);
    res.end();
  };
}

export { MoodSummaryController };

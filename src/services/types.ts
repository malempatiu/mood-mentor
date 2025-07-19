import { Response } from 'express';

export interface MoodSummaryServiceI {
  getMoodSummaryByUserId: (userId: string, res: Response) => Promise<void>;
}

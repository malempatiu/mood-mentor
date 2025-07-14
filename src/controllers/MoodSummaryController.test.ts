import { MoodSummaryController } from './MoodSummaryController';
import { MoodSummaryServiceI } from '@/services/types';
import { Request, Response, NextFunction } from 'express';
import { BadException } from '@/exceptions/BadException';

describe('MoodSummaryController', () => {
  let controller: MoodSummaryController;
  let moodSummaryService: jest.Mocked<MoodSummaryServiceI>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    moodSummaryService = {
      getMoodSummaryByUserId: jest.fn(),
    };
    controller = new MoodSummaryController(moodSummaryService);
    req = {
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('getMoodSummary', () => {
    it('should throw a BadException if userId is missing', async () => {
      req.query = { userId: ' ' };
      // We need to access the private method for testing purposes.
      // In a real-world scenario, you might test this through the router.
      const getMoodSummary = controller['getMoodSummary'];
      await expect(
        getMoodSummary(req as Request, res as Response, next),
      ).rejects.toThrow(new BadException('User id is missing!'));
    });

    it('should call moodSummaryService.getMoodSummaryByUserId with the correct userId', async () => {
      const userId = 'test-user-id';
      req.query = { userId };
      const summary = { summary: 'All good' };
      moodSummaryService.getMoodSummaryByUserId.mockResolvedValue(summary);

      const getMoodSummary = controller['getMoodSummary'];
      await getMoodSummary(req as Request, res as Response, next);

      expect(moodSummaryService.getMoodSummaryByUserId).toHaveBeenCalledWith(
        userId,
      );
    });

    it('should send a 200 status and the summary on success', async () => {
      const userId = 'test-user-id';
      req.query = { userId };
      const summary = { summary: 'All good' };
      moodSummaryService.getMoodSummaryByUserId.mockResolvedValue(summary);

      const getMoodSummary = controller['getMoodSummary'];
      await getMoodSummary(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(summary);
    });
  });
});

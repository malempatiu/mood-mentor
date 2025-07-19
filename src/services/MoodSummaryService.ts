import { MoodEntriesRepositoryI } from '@/repos/types';
import { MoodSummaryServiceI } from './types';
import { mastra } from '@/mastra';
import { Response } from 'express';
import { BadException } from '@/exceptions/BadException';

class MoodSummaryService implements MoodSummaryServiceI {
  constructor(private moodEntriesRepo: MoodEntriesRepositoryI) {}

  getMoodSummaryByUserId = async (
    userId: string,
    res: Response,
  ): Promise<void> => {
    const moodEntries = await this.moodEntriesRepo.fetchUserMoodEntries(userId);
    if (!moodEntries.length) {
      throw new BadException('No mood entries found!');
    }
    const data = moodEntries.map((entry) => {
      return {
        ...entry,
        feelings: entry.feelings.split(';'),
      };
    });
    const moodSummaryAgent = mastra.getAgent('moodSummaryAgent');
    const response = await moodSummaryAgent.stream(`
      Summarize the user's mood for the given mood entries: ${JSON.stringify(data, null, 2)}
    `);
    for await (const chunk of response.textStream) {
      res.write(chunk);
    }
  };
}

export { MoodSummaryService };

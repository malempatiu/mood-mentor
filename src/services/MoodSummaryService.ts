import { MoodEntriesRepositoryI } from '@/repos/types';
import { MoodSummaryDTO, MoodSummaryServiceI } from './types';
import { mastra } from '@/mastra';

class MoodSummaryService implements MoodSummaryServiceI {
  constructor(private moodEntriesRepo: MoodEntriesRepositoryI) {}

  getMoodSummaryByUserId = async (userId: string): Promise<MoodSummaryDTO> => {
    const moodEntries = await this.moodEntriesRepo.fetchUserMoodEntries(userId);
    if (!moodEntries.length) return { summary: '' };
    const moodSummaryAgent = mastra.getAgent('moodSummaryAgent');
    const data = moodEntries.map((entry) => {
      return {
        ...entry,
        feelings: entry.feelings.split(';'),
      };
    });
    const result = await moodSummaryAgent.generate(`
      Summarize the user's mood for the given mood entries: ${{ moodEntries: data }}
    `);
    return JSON.parse(result.text) as MoodSummaryDTO;
  };
}

export { MoodSummaryService };

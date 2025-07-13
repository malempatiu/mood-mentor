export type MoodEntry = {
  id: number;
  mood: string;
  feelings: string;
  journalEntry: string;
  sleepHours: number;
  UserId: string;
  createdAt: string;
};

export interface MoodEntriesRepositoryI {
  fetchUserMoodEntries: (userId: string) => Promise<MoodEntry[]>;
}

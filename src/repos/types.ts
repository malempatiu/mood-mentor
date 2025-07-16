export type MoodEntryDTO = {
  id: number;
  mood: string;
  feelings: string;
  journalEntry: string;
  sleepHours: number;
  createdAt: string;
};

export interface MoodEntriesRepositoryI {
  fetchUserMoodEntries: (userId: string) => Promise<MoodEntryDTO[]>;
}

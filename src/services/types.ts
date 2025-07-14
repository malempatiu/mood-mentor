export type MoodSummaryDTO = {
  summary: string;
  tips?: string[];
};

export interface MoodSummaryServiceI {
  getMoodSummaryByUserId: (userId: string) => Promise<MoodSummaryDTO>;
}

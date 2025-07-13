import { supabase } from '@/lib/supabase/client';
import { MoodEntriesRepositoryI, MoodEntry } from './types';
import { DBException } from '@/exceptions/DBException';

class MoodEntriesRepository implements MoodEntriesRepositoryI {
  fetchUserMoodEntries = async (userId: string): Promise<MoodEntry[]> => {
    let { data: moodEntries, error } = await supabase
      .from('moodEntries')
      .select('*')
      .eq('UserId', userId)
      .order('createdAt', { ascending: false })
      .limit(30);
    if (error) {
      throw new DBException(Number(error.code), error.message);
    }
    return (moodEntries ?? []) as MoodEntry[];
  };
}

export { MoodEntriesRepository };

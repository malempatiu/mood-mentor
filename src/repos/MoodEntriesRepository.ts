import { supabase } from '@/lib/supabase/client';
import { MoodEntriesRepositoryI, MoodEntryDTO } from './types';
import { DBException } from '@/exceptions/DBException';

class MoodEntriesRepository implements MoodEntriesRepositoryI {
  fetchUserMoodEntries = async (userId: string): Promise<MoodEntryDTO[]> => {
    let { data: moodEntries, error } = await supabase
      .from('moodEntries')
      .select('*')
      .eq('UserId', userId)
      .order('createdAt', { ascending: false })
      .limit(5);
    if (error) {
      throw new DBException(Number(error.code), error.message);
    }
    return (moodEntries ?? []) as MoodEntryDTO[];
  };
}

export { MoodEntriesRepository };

import { supabase } from '@/lib/supabase/client';
import { MoodEntriesRepository } from './MoodEntriesRepository';
import { MoodEntryDTO } from './types';
import { DBException } from '@/exceptions/DBException';

jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe('MoodEntriesRepository', () => {
  const mockSelect = jest.fn();
  const mockEq = jest.fn();
  const mockOrder = jest.fn();
  const mockLimit = jest.fn();
  let moodEntriesRepo: MoodEntriesRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    moodEntriesRepo = new MoodEntriesRepository();

    // Setup chain: supabase.from().select().eq().order().limit()
    (supabase.from as jest.Mock).mockReturnValue({
      select: mockSelect,
    });
    mockSelect.mockReturnValue({
      eq: mockEq,
    });
    mockEq.mockReturnValue({
      order: mockOrder,
    });
    mockOrder.mockReturnValue({
      limit: mockLimit,
    });
  });

  it('should fetch mood entries for a given user', async () => {
    const mockData: MoodEntryDTO[] = [
      {
        id: 1,
        mood: 'happy',
        createdAt: '2025-07-12T10:00:00Z',
        feelings: '',
        journalEntry: "I'm feeling super happy",
        sleepHours: 7.5,
      },
    ];

    mockLimit.mockResolvedValue({ data: mockData });

    const result = await moodEntriesRepo.fetchUserMoodEntries('user123');

    expect(supabase.from).toHaveBeenCalledWith('moodEntries');
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(mockEq).toHaveBeenCalledWith('UserId', 'user123');
    expect(mockOrder).toHaveBeenCalledWith('createdAt', { ascending: false });
    expect(mockLimit).toHaveBeenCalledWith(30);
    expect(result).toEqual(mockData);
  });

  it('should return an empty array if no data', async () => {
    mockLimit.mockResolvedValue({ data: null });
    const result = await moodEntriesRepo.fetchUserMoodEntries('user456');
    expect(result).toEqual([]);
  });

  it('should throw DBException on error', async () => {
    mockLimit.mockResolvedValue({
      data: null,
      error: { code: '500', message: 'Database failure' },
    });

    await expect(
      moodEntriesRepo.fetchUserMoodEntries('user789'),
    ).rejects.toThrow(DBException);
    await expect(
      moodEntriesRepo.fetchUserMoodEntries('user789'),
    ).rejects.toThrow('Database failure');
  });
});

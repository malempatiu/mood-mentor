import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_API_URL as string,
  process.env.SUPABASE_API_KEY as string,
);

export { supabase };

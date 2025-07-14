import { config } from '@/config/default';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

export { supabase };

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://wdzcrmjkardnxllwinml.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkemNybWprYXJkbnhsbHdpbm1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NjU5OTcsImV4cCI6MjA0NjI0MTk5N30.pkOIQ1pE4THuQmYvZ99Av1xJuYXGVYGgRc9VGfsiPug';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public',
  },
});
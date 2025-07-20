import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zmrbevchuxfgbucjgohg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptcmJldmNodXhmZ2J1Y2pnb2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MDYxNzMsImV4cCI6MjA2ODQ4MjE3M30.Z-pQry9zS68FvKka81owZgwrTe-DwesWMwun2d-qj44';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tlxpwmdrmacyemrwhxtj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRseHB3bWRybWFjeWVtcndoeHRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MjM1ODgsImV4cCI6MjA1ODk5OTU4OH0.SyY8pRquCZ1bHdJrV5q9XOcH4RoreH7B2Qwv65muSHs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
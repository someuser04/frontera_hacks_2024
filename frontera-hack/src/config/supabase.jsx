import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pqwzdtwzvxlpwcudgmyq.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxd3pkdHd6dnhscHdjdWRnbXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2NDM0NzEsImV4cCI6MjA0MTIxOTQ3MX0.nm3mj88sREyAkAJ8VKhopYKjitw4zIiPeObrJ_aFdkY";
const supabase = createClient(supabaseUrl, anonKey);

export default supabase;
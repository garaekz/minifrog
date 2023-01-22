import { createClient } from 'supabase';

const supabaseUrl = 'https://ackljedzzuaraoreoeoj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFja2xqZWR6enVhcmFvcmVvZW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQxODgwMTcsImV4cCI6MTk4OTc2NDAxN30.g5mY5Ybp_uGS2bONOxkHE4b3Y13NlW22euXSiyICpwA'

export const supabase = await createClient(supabaseUrl, supabaseKey)

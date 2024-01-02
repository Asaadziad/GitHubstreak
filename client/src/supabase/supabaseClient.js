import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hrimjpydqzmlpvrjemev.supabase.co';

const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;


const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
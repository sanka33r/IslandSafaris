import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validation for environment variables
if (!supabaseUrl || supabaseUrl === 'your-project-url') {
    console.error('Missing or invalid NEXT_PUBLIC_SUPABASE_URL in .env.local');
}

if (!supabaseAnonKey || supabaseAnonKey === 'your-anon-key') {
    console.error('Missing or invalid NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
}

// Client for public operations (respects RLS)
export const supabasePublic = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);

// Client for server-side admin operations (bypasses RLS)
// usage: only in Server Components or Server Actions
export const supabaseAdmin = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseServiceKey || supabaseAnonKey || 'placeholder-key',
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

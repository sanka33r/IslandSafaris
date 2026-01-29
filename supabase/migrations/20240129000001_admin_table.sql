-- ADMINS TABLE
create table if not exists admins (
  id uuid primary key default uuid_generate_v4(),
  username text unique not null,
  password_hash text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table admins enable row level security;

-- No public access at all. Only server-side via service_role.
-- This ensures the credentials are never exposed via the client-side Supabase client.

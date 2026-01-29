-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- DESTINATIONS
create table destinations (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text not null,
  ticket_price numeric not null default 0,
  ticket_pricing_type text check (ticket_pricing_type in ('per_person', 'flat')) not null default 'per_person',
  vehicle_price_up_to_3 numeric not null default 0,
  standard_duration_hours integer not null default 3,
  active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- BOOKINGS
create table bookings (
  id uuid primary key default uuid_generate_v4(),
  destination_id uuid references destinations(id) on delete restrict,
  date date not null,
  time time not null,
  group_size integer not null,
  pickup_required boolean not null default false,
  hotel_name text,
  extra_hours integer not null default 0,
  customer_name text not null,
  email text not null,
  phone text not null,
  message text,
  status text check (status in ('new', 'confirmed', 'cancelled')) not null default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- REVIEWS
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  destination_id uuid references destinations(id) on delete set null,
  name text not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text not null,
  approved boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SETTINGS
create table settings (
  key text primary key,
  value text not null
);

-- IMAGES
create table images (
  id uuid primary key default uuid_generate_v4(),
  destination_id uuid references destinations(id) on delete set null,
  cloudinary_public_id text not null,
  secure_url text not null,
  alt_text text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- INDEXES
create index idx_bookings_destination on bookings(destination_id);
create index idx_reviews_destination on reviews(destination_id);
create index idx_images_destination on images(destination_id);

-- RLS POLICIES
alter table destinations enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;
alter table settings enable row level security;
alter table images enable row level security;

-- Public Access (Anon key)
-- Destinations: Read only
create policy "Public destinations are viewable by everyone" on destinations
  for select using (active = true);

-- Bookings: Insert only (no read for public)
create policy "Public can create bookings" on bookings
  for insert with check (true);

-- Reviews: Insert, Read approved
create policy "Public can create reviews" on reviews
  for insert with check (true);
create policy "Public can view approved reviews" on reviews
  for select using (approved = true);

-- Images: Read only
create policy "Public images are viewable by everyone" on images
  for select using (true);

-- Settings: Read whatsapp number etc (if public needed? usually some are public)
-- Assuming settings are read by server mostly, but frontend might need whatsapp number.
-- Let's allow read for specific keys or all for now if no secrets there.
-- Constraints said "No secrets exposed".
-- We'll assume settings are mostly public config (email, etc).
create policy "Public settings are viewable" on settings
  for select using (true);

-- Service Role (Full Access) - Implicitly has access, but explicit policies if using authenticated client? 
-- Usually service_role bypasses RLS.

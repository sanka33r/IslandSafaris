-- SEED DATA

-- Destinations
insert into destinations (slug, name, description, ticket_price, ticket_pricing_type, vehicle_price_up_to_3, standard_duration_hours, active)
values
  (
    'minneriya-national-park',
    'Minneriya National Park',
    'Experience the largest gathering of Asian elephants in the world. Minneriya National Park offers stunning landscapes and rich biodiversity.',
    11350,
    'per_person',
    14500,
    3,
    true
  ),
  (
    'kaudulla-national-park',
    'Kaudulla National Park',
    'A bird watcher''s paradise and home to majestic elephants. Kaudulla is connected to the Minneriya-Kaudulla-Eco Park elephant corridor.',
    11350,
    'per_person',
    16500,
    3,
    true
  ),
  (
    'hurulu-eco-park',
    'Hurulu Eco Park',
    'A designated biosphere reserve offering thrilling jeep safaris through dry evergreen forests filled with wildlife.',
    2860,
    'per_person',
    13500,
    3,
    true
  );

-- Settings
insert into settings (key, value)
values
  ('whatsapp_number', '94770000000'), -- Replace with real number
  ('business_email', 'info@islandsafaris.com'),
  ('extra_hour_price', '5000'); -- Example extra hour price

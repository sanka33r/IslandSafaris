-- SEED DATA

-- Destinations
insert into destinations (
  slug,
  name,
  description,
  summary,
  sections,
  seasonal_calendar,
  tips,
  description_sections,
  ticket_price,
  ticket_pricing_type,
  vehicle_price_up_to_3,
  standard_duration_hours,
  active
)
values
  (
    'minneriya-national-park',
    'Minneriya National Park',
    'The stage for Sri Lanka''s Great Elephant Gathering, with sweeping grasslands and the historic Minneriya Tank.',
    'Minneriya National Park sits in the heart of Sri Lanka''s Cultural Triangle and delivers a National Geographic moment at every turn, from scrub forests to deep wetlands.',
    $$[
      {
        "title": "The Main Event: The Gathering",
        "body": "While the park is beautiful year-round, the dry season (typically August to September) reveals something miraculous. As water sources vanish elsewhere, hundreds of wild elephants migrate to the ancient Minneriya Tank.",
        "bullets": [
          "The Spectacle: Witness up to 300 elephants socializing, bathing, and grazing in a single spot.",
          "The Rarity: The largest seasonal meeting of Asian elephants in the world.",
          "Pro Tip: Afternoon safaris offer the best light and the highest chance of seeing the herds emerge from the forest."
        ]
      }
    ]$$::jsonb,
    $$[
      {
        "months": "August - September",
        "note": "Peak gathering at Minneriya Tank."
      }
    ]$$::jsonb,
    $$[]$$::jsonb,
    $${
      "intro": {
        "title": "The Kingdom of the Giants",
        "content": "Nestled in the heart of Sri Lanka''s Cultural Triangle, Minneriya National Park is the stage for one of nature''s most spectacular wildlife events."
      },
      "main_event": {
        "title": "The Gathering",
        "content": "During the dry season, hundreds of wild elephants migrate to the ancient Minneriya Tank."
      },
      "highlights": [
        "Witness up to 300 elephants in one location",
        "The largest seasonal gathering of Asian elephants in the world",
        "Perfect for wildlife photography"
      ],
      "best_time": {
        "season": "August - September",
        "time_of_day": "Afternoon safaris"
      },
      "safari_tips": [
        "Afternoon safaris offer the best light",
        "Carry binoculars and zoom lenses",
        "Remain quiet and respect wildlife"
      ]
    }$$::jsonb,
    11350,
    'per_person',
    14500,
    3,
    true
  ),
  (
    'kaudulla-national-park',
    'Kaudulla National Park',
    'A rugged corridor park with a massive tank and frequent elephant gatherings, especially August to December.',
    'Designated in 2002, Kaudulla is a vital elephant corridor linking Minneriya, Wasgamuwa, and Somawathiya. It offers a quieter, more intimate safari experience.',
    $$[
      {
        "title": "The Other Great Gathering",
        "body": "While many travelers flock to Minneriya, seasoned safari-goers head to Kaudulla. Because the elephants migrate between the two based on water levels, Kaudulla often hosts the gathering from August to December.",
        "bullets": [
          "The Vibe: A more intimate, raw experience with fewer jeeps. You can often watch a herd of 200+ elephants in near-silence.",
          "The Landscape: Dominated by the massive Kaudulla Tank, opening into sweeping grasslands that make spotting wildlife easy."
        ]
      },
      {
        "title": "Your Safari Blueprint",
        "bullets": [
          "Duration: Expect a 3-4 hour ride. Afternoon safaris (pickup around 1:00 PM) are golden as elephants move toward the water at sunset.",
          "Location: Just 30 km from the ancient city of Polonnaruwa, making it an easy add-on to a cultural tour.",
          "Eco-Ethos: Kaudulla is prized for being relatively undisturbed. Visitors are encouraged to keep a respectful distance."
        ]
      }
    ]$$::jsonb,
    $$[
      {
        "months": "August - December",
        "note": "Frequent gatherings as elephants move with water levels."
      }
    ]$$::jsonb,
    $$[
      "Gear Up: Bring a high-zoom lens for photography and binoculars for bird watching.",
      "Essentials: Do not forget sunscreen and insect repellent."
    ]$$::jsonb,
    $${
      "intro": {
        "title": "The Hidden Corridor of the North Central",
        "content": "Kaudulla National Park is a vital elephant corridor connecting several major parks."
      },
      "experience": {
        "title": "The Other Great Gathering",
        "content": "With fewer jeeps and vast open plains, Kaudulla offers a quieter, more raw safari experience."
      },
      "highlights": [
        "200+ elephants in near silence",
        "Massive Kaudulla Tank grasslands",
        "Less crowded than Minneriya"
      ],
      "safari_details": {
        "duration": "3-4 hours",
        "best_time": "Afternoon (1:00 PM pickup)"
      },
      "pro_traveler_tips": [
        "Bring sunscreen and insect repellent",
        "Use a high-zoom lens for photography",
        "Maintain respectful distance from wildlife"
      ]
    }$$::jsonb,
    11350,
    'per_person',
    16500,
    3,
    true
  ),
  (
    'hurulu-eco-park',
    'Hurulu Eco Park',
    'An intimate eco-park of teak forests, best in December to January for close elephant encounters.',
    'Hurulu is the secret sanctuary for the final winter leg of the migration, with golden light, rugged teak forests, and up-close elephant sightings.',
    $$[
      {
        "title": "The Final Leg of the Great Migration",
        "body": "Elephants move between three major parks along a natural jungle corridor. To see them, you follow the water."
      },
      {
        "title": "The Experience",
        "body": "Unlike the vast open plains of Minneriya, Hurulu is an evergreen forest. You will see elephants emerging from thick brush and crossing jungle tracks, creating a much more dramatic, intimate jungle feel."
      },
      {
        "title": "Your Safari Game Plan",
        "bullets": [
          "Best Time: Early morning (6:00 AM) for active wildlife or late afternoon (2:30 PM) for the best photography light as elephants move toward food.",
          "Duration: 3 to 4 hours of pure exploration.",
          "Proximity: Located in Habarana, it is the perfect afternoon activity after climbing Sigiriya Rock in the morning."
        ]
      },
      {
        "title": "Why Choose Hurulu?",
        "body": "Because it is an eco park and slightly smaller than the massive national parks, it often feels less like a tourist highway and more like a private expedition. In January, while Minneriya might be too wet or empty, Hurulu is teeming with life."
      }
    ]$$::jsonb,
    $$[
      {
        "months": "July - September",
        "note": "Minneriya peak gathering."
      },
      {
        "months": "October - November",
        "note": "Kaudulla hosts as the rains fill the tanks."
      },
      {
        "months": "December - January",
        "note": "Hurulu Eco Park is the winter destination."
      }
    ]$$::jsonb,
    $$[]$$::jsonb,
    $${
      "intro": {
        "title": "The Intimate Forest Escape",
        "content": "Hurulu Eco Park offers a quieter, forest-based safari experience, especially active during December and January."
      },
      "migration_cycle": [
        "July - September: Minneriya",
        "October - November: Kaudulla",
        "December - January: Hurulu Eco Park"
      ],
      "experience": {
        "title": "The Final Leg of the Great Migration",
        "content": "Elephants emerge from dense forest, creating dramatic close encounters."
      },
      "best_times": {
        "morning": "6:00 AM - Active wildlife",
        "afternoon": "2:30 PM - Best photography light"
      },
      "why_choose_hurulu": [
        "Smaller eco park with fewer vehicles",
        "Feels like a private jungle expedition",
        "Ideal after Sigiriya Rock climb"
      ]
    }$$::jsonb,
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

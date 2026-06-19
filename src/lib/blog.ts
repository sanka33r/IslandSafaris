import { articleKaudullaVsMinneriya } from './articles/kaudulla-vs-minneriya';
import { articleBestSafariNearSigiriya } from './articles/best-safari-near-sigiriya';
import { articleBestTimeForElephantSafari } from './articles/best-time-for-elephant-safari';
import { articleThingsToDoInSigiriya } from './articles/things-to-do-in-sigiriya';
import { articleCompleteGuideElephantSafaris } from './articles/complete-guide-elephant-safaris';

export type BlogCategory =
  | 'safari-guide'
  | 'park-comparison'
  | 'travel-planning'
  | 'booking-tips';

export type BlogSection = {
  id: string;
  title: string;
  content: string[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type InternalLinkSuggestion = {
  label: string;
  href: string;
};

export type BlogAuthor = {
  name: string;
  role: string;
  bio: string;
};

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  keywords: string[];
  publishedAt: string;
  readMinutes: number;
  author: BlogAuthor;
  intro: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  relatedSlugs: string[];
  internalLinkSuggestions: InternalLinkSuggestion[];
};

export const DEFAULT_AUTHOR: BlogAuthor = {
  name: 'Island Safaris Editorial Team',
  role: 'Sri Lanka Safari Specialists',
  bio: 'Our local team combines field tracking knowledge with practical travel planning advice to help visitors book the right safari at the right time.',
};

export const BLOG_CATEGORIES: Array<{ id: BlogCategory; label: string }> = [
  { id: 'safari-guide', label: 'Safari Guides' },
  { id: 'park-comparison', label: 'Park Comparisons' },
  { id: 'travel-planning', label: 'Travel Planning' },
  { id: 'booking-tips', label: 'Booking Tips' },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  articleKaudullaVsMinneriya,
  articleBestSafariNearSigiriya,
  articleBestTimeForElephantSafari,
  articleThingsToDoInSigiriya,
  articleCompleteGuideElephantSafaris,
  {
    slug: 'minneriya-vs-kaudulla-vs-hurulu-which-safari-to-book',
    title: 'Minneriya vs Kaudulla vs Hurulu: Which Safari Should You Book?',
    excerpt:
      'Compare Minneriya, Kaudulla, and Hurulu Eco Park by season, crowd levels, and wildlife behavior to book the best Sri Lanka safari for your dates.',
    category: 'park-comparison',
    keywords: ['Minneriya safari', 'Kaudulla safari', 'Hurulu Eco Park safari'],
    publishedAt: '2026-04-20',
    readMinutes: 10,
    author: DEFAULT_AUTHOR,
    intro: [
      'Choosing between Minneriya, Kaudulla, and Hurulu Eco Park can make a major difference in your safari experience. Herd movement in this corridor changes with rainfall, water levels, and grass conditions.',
      'If your goal is booking-intent certainty, the best approach is to align park choice with your travel window. This guide helps you decide quickly and avoid disappointing sightings.',
    ],
    sections: [
      {
        id: 'seasonal-overview',
        title: 'Seasonal Overview for Better Elephant Sightings',
        content: [
          'Minneriya is usually strongest during dry months when elephants gather around water. Kaudulla often performs well in transition months, while Hurulu becomes attractive when herds shift toward forested edges.',
          'The exact timing can vary year to year, so travelers should prioritize a flexible plan rather than relying only on old blog calendars.',
        ],
      },
      {
        id: 'crowds-and-experience',
        title: 'Crowds, Atmosphere, and Photo Opportunities',
        content: [
          'Minneriya can be busier in peak season because it is the most well-known elephant gathering location. Kaudulla and Hurulu may offer calmer drives and more relaxed positioning for photos.',
          'For couples and photographers, quieter parks can improve both comfort and visual quality of sightings.',
        ],
      },
      {
        id: 'how-to-book-smart',
        title: 'How to Book the Right Safari Without Guesswork',
        content: [
          'Book a private safari with operator support that checks current movement before final confirmation. This avoids choosing a park only by name popularity.',
          'When possible, keep one half-day flexible in your itinerary so your guide can direct you to the strongest active zone.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Minneriya always the best park?',
        answer:
          'Not always. It is often excellent in peak gathering months, but Kaudulla or Hurulu can outperform it depending on seasonal movement.',
      },
      {
        question: 'Can I decide the park on the same day?',
        answer:
          'Yes, if your operator supports dynamic park recommendations and has available jeeps.',
      },
    ],
    relatedSlugs: [
      'best-time-for-minneriya-elephant-safari',
      'how-to-plan-a-sri-lanka-safari-from-sigiriya',
    ],
    internalLinkSuggestions: [
      { label: 'Minneriya Safari page', href: '/destinations/minneriya-national-park' },
      { label: 'Kaudulla Safari page', href: '/destinations/kaudulla-national-park' },
      { label: 'Hurulu Eco Park Safari page', href: '/destinations/hurulu-eco-park' },
      { label: 'Safari booking page', href: '/booking' },
    ],
  },
  {
    slug: 'best-time-for-minneriya-elephant-safari',
    title: 'Best Time to Book a Minneriya Elephant Safari in Sri Lanka',
    excerpt:
      'Understand monthly wildlife behavior, weather patterns, and practical booking windows for Minneriya elephant safaris.',
    category: 'safari-guide',
    keywords: ['Minneriya elephant safari Sri Lanka', 'best time Minneriya safari'],
    publishedAt: '2026-04-18',
    readMinutes: 8,
    author: DEFAULT_AUTHOR,
    intro: [
      'Minneriya remains one of the strongest booking-intent safari keywords in Sri Lanka, but timing is everything. Travelers who match their dates to active elephant movement usually see much better results.',
      'This guide breaks down when to book, what to expect, and how to choose your safari slot for better sightings and smoother logistics.',
    ],
    sections: [
      {
        id: 'monthly-patterns',
        title: 'Monthly Elephant Movement Patterns',
        content: [
          'July to September is commonly regarded as high-probability season for large gatherings around Minneriya Tank. Shoulder periods can still be productive depending on rainfall and grass levels.',
          'Always verify current conditions with a local operator during final booking.',
        ],
      },
      {
        id: 'time-slot-planning',
        title: 'Morning vs Afternoon Safari Slots',
        content: [
          'Afternoon drives often provide warm light and active movement near open areas, while morning trips can be cooler and less crowded.',
          'If you are staying near Sigiriya, both slots are practical with advance pickup planning.',
        ],
      },
      {
        id: 'conversion-checklist',
        title: 'Booking Checklist Before You Confirm',
        content: [
          'Confirm jeep type, pickup location, expected duration, and whether park ticket fees are separate.',
          'Use operators that can recommend park changes if movement shifts toward Kaudulla or Hurulu.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How early should I book Minneriya safari?',
        answer:
          'Book at least a few days ahead in peak season to secure preferred slots and pickup timing.',
      },
      {
        question: 'Is park entry included in safari price?',
        answer:
          'Usually no. Most operators charge jeep and guiding separately from government park ticket fees.',
      },
    ],
    relatedSlugs: [
      'minneriya-vs-kaudulla-vs-hurulu-which-safari-to-book',
      'how-to-plan-a-sri-lanka-safari-from-sigiriya',
    ],
    internalLinkSuggestions: [
      { label: 'Book Minneriya safari', href: '/destinations/minneriya-national-park' },
      { label: 'Safari booking form', href: '/booking?destination=minneriya-national-park' },
      { label: 'All safari destinations', href: '/destinations' },
    ],
  },
  {
    slug: 'how-to-plan-a-sri-lanka-safari-from-sigiriya',
    title: 'How to Plan a Sri Lanka Safari from Sigiriya (Step by Step)',
    excerpt:
      'A practical safari planning guide for travelers staying in Sigiriya or Habarana, including pickup, timing, and park selection.',
    category: 'travel-planning',
    keywords: ['Sigiriya safari booking', 'Sri Lanka safari from Sigiriya'],
    publishedAt: '2026-04-15',
    readMinutes: 9,
    author: DEFAULT_AUTHOR,
    intro: [
      'Sigiriya is one of the best safari bases in Sri Lanka because it offers quick access to Minneriya, Kaudulla, and Hurulu Eco Park. Planning from here can save time and improve sighting quality.',
      'Use this step-by-step framework to organize your safari with fewer surprises and stronger booking confidence.',
    ],
    sections: [
      {
        id: 'choose-your-date',
        title: 'Step 1: Choose Date by Season, Not Just Convenience',
        content: [
          'Start with your available travel days, then map them to current wildlife movement. This allows you to prioritize the most active park rather than defaulting to a single name.',
        ],
      },
      {
        id: 'confirm-logistics',
        title: 'Step 2: Confirm Pickup and Duration',
        content: [
          'Most travelers book 3 to 4 hour drives with pickup from Sigiriya or Habarana hotels. Confirm departure time, return time, and whether private jeep is guaranteed.',
        ],
      },
      {
        id: 'final-booking',
        title: 'Step 3: Finalize Booking With Flexible Park Advice',
        content: [
          'Choose an operator that can suggest Minneriya, Kaudulla, or Hurulu based on same-week movement. This increases odds of productive sightings.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I do safari and Sigiriya Rock on the same day?',
        answer:
          'Yes, many travelers combine them by choosing an early or late safari slot and planning rest time between activities.',
      },
      {
        question: 'Is private pickup available from Sigiriya hotels?',
        answer:
          'Yes, pickup is commonly available from Sigiriya and nearby areas with prior booking confirmation.',
      },
    ],
    relatedSlugs: [
      'minneriya-vs-kaudulla-vs-hurulu-which-safari-to-book',
      'best-time-for-minneriya-elephant-safari',
    ],
    internalLinkSuggestions: [
      { label: 'Safari booking page', href: '/booking' },
      { label: 'Contact for custom safari', href: '/contact' },
      { label: 'Safari destination index', href: '/destinations' },
    ],
  },
];

export function getAllBlogArticles(): BlogArticle[] {
  return BLOG_ARTICLES;
}

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getBlogArticlesByCategory(category: BlogCategory): BlogArticle[] {
  return BLOG_ARTICLES.filter((article) => article.category === category);
}

export function getRelatedBlogArticles(slugs: string[]): BlogArticle[] {
  return BLOG_ARTICLES.filter((article) => slugs.includes(article.slug));
}

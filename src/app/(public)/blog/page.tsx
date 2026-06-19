import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { BLOG_CATEGORIES, BlogCategory, getAllBlogArticles } from '@/lib/blog';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Sri Lanka Safari Blog',
  description:
    'Explore long-form Sri Lanka safari guides, park comparisons, and booking tips to plan Minneriya, Kaudulla, and Hurulu Eco Park trips.',
  path: '/blog',
});

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage(props: BlogPageProps) {
  const searchParams = await props.searchParams;
  const selectedCategory = searchParams.category as BlogCategory | undefined;
  const allArticles = getAllBlogArticles();
  const filteredArticles =
    selectedCategory && BLOG_CATEGORIES.some((cat) => cat.id === selectedCategory)
      ? allArticles.filter((article) => article.category === selectedCategory)
      : allArticles;

  return (
    <div className="bg-secondary-50 min-h-screen py-10 sm:py-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-safari-900 mb-3">
            Sri Lanka Safari SEO Blog
          </h1>
          <p className="text-safari-600 max-w-3xl">
            Long-form destination content for booking intent keywords, wildlife season planning,
            and safari conversion strategies.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-bold text-safari-900 mb-3">Filter by category</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`px-3 py-2 rounded-full border text-sm font-semibold transition-colors ${
                !selectedCategory
                  ? 'bg-secondary-600 border-secondary-600 text-white'
                  : 'bg-white border-safari-200 text-safari-800 hover:bg-safari-50'
              }`}
            >
              All
            </Link>
            {BLOG_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.id}`}
                className={`px-3 py-2 rounded-full border text-sm font-semibold transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-secondary-600 border-secondary-600 text-white'
                    : 'bg-white border-safari-200 text-safari-800 hover:bg-safari-50'
                }`}
              >
                {category.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl border border-safari-100 p-5 sm:p-6"
            >
              <p className="text-xs uppercase tracking-wide text-secondary-700 font-bold mb-2">
                {article.category.replace('-', ' ')}
              </p>
              <h2 className="text-xl font-bold text-safari-900 mb-2">{article.title}</h2>
              <p className="text-safari-600 text-sm leading-relaxed mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-safari-500">
                <span>{article.publishedAt}</span>
                <span>{article.readMinutes} min read</span>
              </div>
              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex mt-4 text-sm font-bold text-secondary-700 hover:text-secondary-800"
              >
                Read article
              </Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

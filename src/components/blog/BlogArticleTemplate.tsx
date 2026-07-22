import Link from 'next/link';
import { BlogArticle } from '@/lib/blog';

type BlogArticleTemplateProps = {
  article: BlogArticle;
  relatedArticles: BlogArticle[];
};

export default function BlogArticleTemplate({
  article,
  relatedArticles,
}: BlogArticleTemplateProps) {
  return (
    <div className="bg-secondary-50 min-h-screen py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8 bg-white border border-safari-100 rounded-3xl p-6 sm:p-10 space-y-8">
            <header className="space-y-4">
              <span className="inline-flex px-3 py-1 rounded-full bg-secondary-100 text-secondary-700 text-xs font-bold uppercase tracking-wide">
                {article.category.replace('-', ' ')}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-safari-900 leading-tight">
                {article.title}
              </h1>
              <p className="text-safari-600 leading-relaxed">{article.excerpt}</p>
              <div className="text-sm text-safari-500 flex flex-wrap gap-4">
                <span>Published: {article.publishedAt}</span>
                <span>{article.readMinutes} min read</span>
              </div>
            </header>

            <section className="space-y-4">
              {article.intro.map((paragraph) => (
                <p key={paragraph} className="text-safari-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>

            <section className="space-y-6">
              {article.sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-2xl font-bold text-safari-900 mb-3">{section.title}</h2>
                  <div className="space-y-3">
                    {section.content.map((paragraph) => (
                      <p key={paragraph} className="text-safari-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-safari-900">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {article.faqs.map((faq) => (
                  <details key={faq.question} className="rounded-xl border border-safari-100 p-4">
                    <summary className="cursor-pointer font-semibold text-safari-900">
                      {faq.question}
                    </summary>
                    <p className="text-sm text-safari-700 mt-2 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-safari-50 border border-safari-100 p-5">
              <h2 className="text-xl font-bold text-safari-900 mb-2">About the author</h2>
              <p className="text-sm font-semibold text-secondary-700">{article.author.name}</p>
              <p className="text-sm text-safari-600">{article.author.role}</p>
              <p className="text-sm text-safari-700 mt-3 leading-relaxed">{article.author.bio}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-safari-900">Internal linking suggestions</h2>
              <div className="flex flex-wrap gap-2">
                {article.internalLinkSuggestions.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex px-3 py-2 rounded-full bg-white border border-safari-200 text-sm font-semibold text-safari-800 hover:bg-safari-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-secondary-50 border border-secondary-100 p-5">
              <h2 className="text-xl font-bold text-safari-900 mb-3">Plan and book your Sri Lanka safari</h2>
              <p className="text-sm text-safari-700 leading-relaxed mb-4">
                Ready to turn this guide into a trip? Use these priority booking and planning pages.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/"
                  className="inline-flex px-3 py-2 rounded-full bg-secondary-600 text-white text-sm font-semibold hover:bg-secondary-700 transition-colors"
                >
                  Sigiriya safari tours
                </Link>
                <Link
                  href="/booking"
                  className="inline-flex px-3 py-2 rounded-full bg-white border border-safari-200 text-sm font-semibold text-safari-800 hover:bg-safari-50 transition-colors"
                >
                  Book your Sri Lanka safari
                </Link>
                <Link
                  href="/destinations"
                  className="inline-flex px-3 py-2 rounded-full bg-white border border-safari-200 text-sm font-semibold text-safari-800 hover:bg-safari-50 transition-colors"
                >
                  Compare safari parks
                </Link>
                <Link
                  href="/packages"
                  className="inline-flex px-3 py-2 rounded-full bg-white border border-safari-200 text-sm font-semibold text-safari-800 hover:bg-safari-50 transition-colors"
                >
                  Explore Sigiriya experiences
                </Link>
              </div>
            </section>
          </article>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-safari-100 rounded-3xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-safari-900 mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {article.sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-safari-700 hover:text-secondary-700 transition-colors"
                  >
                    {index + 1}. {section.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="bg-white border border-safari-100 rounded-3xl p-6">
              <h2 className="text-lg font-bold text-safari-900 mb-4">Related articles</h2>
              <div className="space-y-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="block p-3 rounded-xl border border-safari-100 hover:border-secondary-300 hover:bg-secondary-50 transition-colors"
                  >
                    <p className="font-semibold text-safari-900 text-sm">{related.title}</p>
                    <p className="text-xs text-safari-500 mt-1">{related.readMinutes} min read</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

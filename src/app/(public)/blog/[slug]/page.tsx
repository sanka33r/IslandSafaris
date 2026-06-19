import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogArticleTemplate from '@/components/blog/BlogArticleTemplate';
import {
  getAllBlogArticles,
  getBlogArticleBySlug,
  getRelatedBlogArticles,
} from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(props: BlogArticlePageProps): Promise<Metadata> {
  const params = await props.params;
  const article = getBlogArticleBySlug(params.slug);

  if (!article) {
    return buildMetadata({
      title: 'Blog Article',
      description: 'Safari blog article',
      path: `/blog/${params.slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    type: 'article',
  });
}

export default async function BlogArticlePage(props: BlogArticlePageProps) {
  const params = await props.params;
  const article = getBlogArticleBySlug(params.slug);

  if (!article) {
    return notFound();
  }

  const relatedArticles = getRelatedBlogArticles(article.relatedSlugs);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: article.title, path: `/blog/${article.slug}` },
        ])}
      />
      <JsonLd
        data={faqSchema(
          article.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
        )}
      />
      <div className="container mx-auto px-4 sm:px-6 pt-6">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: article.title },
          ]}
        />
      </div>
      <BlogArticleTemplate article={article} relatedArticles={relatedArticles} />
    </>
  );
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/writing');

export type Pillar = 'Agentic AI' | 'Enterprise' | 'LATAM' | 'Frontier' | 'CTO Craft';

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTimeMinutes: number;
  pillar: Pillar;
  published: boolean;
  keywords?: string[];
}

export interface Article extends ArticleMeta {
  content: string; // raw markdown
  contentHtml: string; // rendered HTML
}

function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));

  const articles = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      if (!data.published) return null;

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString().split('T')[0],
        readTimeMinutes: calculateReadTime(content),
        pillar: (data.pillar || 'Agentic AI') as Pillar,
        published: Boolean(data.published),
        keywords: data.keywords || [],
      } as ArticleMeta;
    })
    .filter((a): a is ArticleMeta => a !== null);

  // Sort newest first
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  if (!data.published) return null;

  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || new Date().toISOString().split('T')[0],
    readTimeMinutes: calculateReadTime(content),
    pillar: (data.pillar || 'Agentic AI') as Pillar,
    published: Boolean(data.published),
    keywords: data.keywords || [],
    content,
    contentHtml: processedContent.toString(),
  };
}

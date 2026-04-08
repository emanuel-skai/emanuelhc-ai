export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO format
  readTimeMinutes: number;
  pillar: 'Agentic AI' | 'Enterprise' | 'LATAM' | 'Frontier' | 'CTO Craft';
  published: boolean;
  content: string; // Markdown
}

export const articles: Article[] = [];
// Articles will be added here as they are written

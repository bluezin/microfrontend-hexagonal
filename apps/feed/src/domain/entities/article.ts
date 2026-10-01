export interface Article {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  coverResourceId: string | null;
  publishedAt: string;
}

export type NewArticle = Omit<Article, "id" | "publishedAt">;

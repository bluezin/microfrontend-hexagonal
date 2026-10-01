import type { Article } from "../entities/article";

export interface ArticleRepository {
  getAll(): Promise<Article[]>;
  getById(id: string): Promise<Article | null>;
  add(article: Article): Promise<Article>;
}

import type { Article } from "../../domain/entities/article";
import type { ArticleRepository } from "../../domain/ports/article-repository";

export class GetArticles {
  private readonly repository: ArticleRepository;

  constructor(repository: ArticleRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Article[]> {
    const articles = await this.repository.getAll();

    return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }
}

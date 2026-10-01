import type { Article } from "../../domain/entities/article";
import type { ArticleRepository } from "../../domain/ports/article-repository";

export class GetArticleById {
  private readonly repository: ArticleRepository;

  constructor(repository: ArticleRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Article | null> {
    return this.repository.getById(id);
  }
}

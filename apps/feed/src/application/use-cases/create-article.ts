import type { Article } from "../../domain/entities/article";
import { createArticle } from "../../domain/entities/create-article";
import type { ArticleRepository } from "../../domain/ports/article-repository";
import type { IdGenerator } from "../../domain/ports/id-generator";
import type { NewArticle } from "../../domain/entities/article";

export class CreateArticle {
  private readonly repository: ArticleRepository;
  private readonly idGenerator: IdGenerator;

  constructor(repository: ArticleRepository, idGenerator: IdGenerator) {
    this.repository = repository;
    this.idGenerator = idGenerator;
  }

  async execute(newArticle: NewArticle): Promise<Article> {
    const article = createArticle(newArticle, this.idGenerator.next());

    return this.repository.add(article);
  }
}

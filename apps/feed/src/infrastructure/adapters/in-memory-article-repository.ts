import type { Article } from "../../domain/entities/article";
import type { ArticleRepository } from "../../domain/ports/article-repository";

export class InMemoryArticleRepository implements ArticleRepository {
  private items: Article[] = [];

  async getAll() {
    return this.items;
  }

  async getById(id: string) {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async add(item: Article) {
    this.items.push(item);
    return item;
  }
}

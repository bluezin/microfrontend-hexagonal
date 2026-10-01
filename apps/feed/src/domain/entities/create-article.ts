import { DomainError } from "../errors/domain-error";
import type { Article, NewArticle } from "./article";

export function createArticle(newArticle: NewArticle, id: string): Article {
  if (newArticle.title.trim().length < 3) {
    throw new DomainError("El título debe tener al menos 3 caracteres.");
  }

  if (newArticle.body.trim().length < 10) {
    throw new DomainError("El cuerpo debe tener al menos 10 caracteres.");
  }

  return {
    ...newArticle,
    id,
    publishedAt: new Date().toISOString().slice(0, 10),
  };
}

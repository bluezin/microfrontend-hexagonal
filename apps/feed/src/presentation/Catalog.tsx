import { useCallback, useEffect, useState } from "react";
import type { Article, NewArticle } from "../domain/entities/article";
import { DomainError } from "../domain/errors/domain-error";
import type { Resource } from "../domain/entities/resource";
import { catalogContainer } from "../composition-root";
import { ArticleForm } from "./ArticleForm";
import { ArticleList } from "./ArticleList";
import { ResourceForm, ResourceGallery } from "./ResourceGallery";
import styles from "./Catalog.module.css";

export interface FeedProps {
  selectedArticleId?: string | null;
  onSelectArticle?: (id: string | null) => void;
}

export default function Catalog({ selectedArticleId = null, onSelectArticle }: FeedProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const [nextArticles, nextResources] = await Promise.all([
      catalogContainer.getArticles.execute(),
      catalogContainer.getResources.execute(),
    ]);

    setArticles(nextArticles);
    setResources(nextResources);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const coverOf = useCallback(
    (articleId: string) => {
      const cover = resources.find(
        (resource) =>
          resource.type === "image" &&
          articles.find((article) => article.id === articleId)?.coverResourceId === resource.id,
      );

      return cover?.preview ?? null;
    },
    [articles, resources],
  );

  function run(action: () => Promise<unknown>): Promise<void> {
    setError(null);

    return action()
      .then(refresh)
      .catch((cause: unknown) =>
        setError(
          cause instanceof DomainError ? cause.message : "Ocurrió un error inesperado.",
        ),
      );
  }

  const selected = articles.find((article) => article.id === selectedArticleId) ?? null;

  return (
    <div className={styles.feed}>
      {error !== null && <p className={styles.error}>{error}</p>}

      <section>
        <h2>Artículos</h2>
        <ArticleList
          articles={articles}
          coverOf={coverOf}
          onSelect={(id) => onSelectArticle?.(id === selectedArticleId ? null : id)}
        />
        {selected !== null && (
          <p className={styles.detail}>
            <strong>{selected.title}</strong> — {selected.excerpt}
          </p>
        )}
        <ArticleForm
          resources={resources}
          onSubmit={(input: NewArticle) =>
            run(() => catalogContainer.createArticle.execute(input))
          }
        />
      </section>

      <section>
        <h2>Recursos</h2>
        <ResourceGallery resources={resources} />
        <ResourceForm
          onSubmit={(input) =>
            run(() => catalogContainer.createResource.execute(input, input.type))
          }
        />
      </section>
    </div>
  );
}

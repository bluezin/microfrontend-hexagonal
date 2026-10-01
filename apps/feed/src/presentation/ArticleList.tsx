import styles from "./ArticleList.module.css";

export interface ArticleListProps {
  articles: { id: string; title: string; excerpt: string; publishedAt: string }[];
  coverOf: (articleId: string) => string | null;
  onSelect: (id: string) => void;
}

export function ArticleList({ articles, coverOf, onSelect }: ArticleListProps) {
  if (articles.length === 0) {
    return <p className={styles.empty}>Todavía no hay artículos publicados.</p>;
  }

  return (
    <ul className={styles.list}>
      {articles.map((article) => {
        const cover = coverOf(article.id);

        return (
          <li key={article.id}>
            <button type="button" className={styles.card} onClick={() => onSelect(article.id)}>
              {cover !== null && <img src={cover} alt="" className={styles.cover} />}
              <div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <time dateTime={article.publishedAt}>{article.publishedAt}</time>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

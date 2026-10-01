import { useState } from "react";
import type { FormEvent } from "react";
import type { NewArticle } from "../domain/entities/article";
import type { Resource } from "../domain/entities/resource";
import styles from "./Form.module.css";

export interface ArticleFormProps {
  resources: Resource[];
  onSubmit: (input: NewArticle) => Promise<void>;
}

const EMPTY: NewArticle = {
  title: "",
  excerpt: "",
  body: "",
  coverResourceId: null,
};

export function ArticleForm({ resources, onSubmit }: ArticleFormProps) {
  const [form, setForm] = useState(EMPTY);
  const images = resources.filter((resource) => resource.type === "image");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await onSubmit(form);
    setForm(EMPTY);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        placeholder="Título"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Bajada"
        value={form.excerpt}
        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
      />
      <textarea
        placeholder="Cuerpo del artículo"
        rows={4}
        value={form.body}
        onChange={(e) => setForm({ ...form, body: e.target.value })}
      />
      <select
        value={form.coverResourceId ?? ""}
        onChange={(e) => setForm({ ...form, coverResourceId: e.target.value || null })}
      >
        <option value="">Sin imagen de portada</option>
        {images.map((resource) => (
          <option key={resource.id} value={resource.id}>
            {resource.name}
          </option>
        ))}
      </select>
      <button type="submit">Publicar artículo</button>
    </form>
  );
}

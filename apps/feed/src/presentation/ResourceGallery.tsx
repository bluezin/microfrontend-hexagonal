import { useState } from "react";
import type { FormEvent } from "react";
import type { Resource, ResourceType } from "../domain/entities/resource";
import styles from "./ResourceGallery.module.css";
import formStyles from "./Form.module.css";

export interface ResourceGalleryProps {
  resources: Resource[];
}

export function ResourceGallery({ resources }: ResourceGalleryProps) {
  if (resources.length === 0) {
    return <p className={styles.empty}>No hay recursos subidos todavía.</p>;
  }

  return (
    <div className={styles.grid}>
      {resources.map((resource) => (
        <figure key={resource.id} className={styles.resource}>
          {resource.type === "image" ? (
            <img src={resource.preview} alt={resource.name} />
          ) : (
            <div className={styles.file} aria-hidden="true">
              {resource.name.split(".").pop()?.toUpperCase()}
            </div>
          )}
          <figcaption>
            <strong>{resource.name}</strong>
            <span>{resource.description}</span>
            <span className={styles.size}>{formatSize(resource.size)}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export interface ResourceFormProps {
  onSubmit: (input: {
    name: string;
    description: string;
    type: Resource["type"];
    preview: string;
    size: number;
  }) => Promise<void>;
}

const EMPTY: {
  name: string;
  description: string;
  type: ResourceType;
  preview: string;
  size: number;
} = { name: "", description: "", type: "image", preview: "", size: 0 };

export function ResourceForm({ onSubmit }: ResourceFormProps) {
  const [form, setForm] = useState(EMPTY);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await onSubmit(form);
    setForm(EMPTY);
  }

  return (
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <input
        placeholder="Nombre del recurso"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <textarea
        placeholder="Descripción"
        rows={2}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <div className={formStyles.row}>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value as Resource["type"] })}
        >
          <option value="image">Imagen</option>
          <option value="file">Archivo</option>
        </select>
        {form.type === "image" && (
          <input
            placeholder="URL de la imagen"
            value={form.preview}
            onChange={(e) => setForm({ ...form, preview: e.target.value })}
          />
        )}
        <input
          type="number"
          placeholder="Tamaño en bytes"
          value={form.size || ""}
          onChange={(e) => setForm({ ...form, size: Number(e.target.value) })}
        />
      </div>
      <button type="submit">Subir recurso</button>
    </form>
  );
}

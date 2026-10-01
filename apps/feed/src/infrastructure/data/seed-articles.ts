import type { Article } from "../../domain/entities/article";

export const seedArticles = (): Article[] => [
  {
    id: "a1",
    title: "Microfrontends 101",
    excerpt: "Del monolito a equipos independientes.",
    body: "Un microfrontend es una pieza de UI que un equipo despliega por separado y se compone en runtime.",
    coverResourceId: "r1",
    publishedAt: "2026-09-01",
  },
  {
    id: "a2",
    title: "Hexagonal para frontends",
    excerpt: "Ports y adapters en el navegador.",
    body: "El dominio no conoce React ni localStorage: los casos de uso dependen de puertos.",
    coverResourceId: null,
    publishedAt: "2026-09-10",
  },
];

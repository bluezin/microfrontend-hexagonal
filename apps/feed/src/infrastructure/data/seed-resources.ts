import type { Resource } from "../../domain/entities/resource";

export const seedResources = (): Resource[] => [
  {
    id: "r1",
    name: "Logo del proyecto",
    type: "image",
    size: 245_600,
    description: "Versión oficial del logo.",
    preview: "https://picsum.photos/seed/logo/400/300",
    uploadedAt: "2026-09-20",
  },
  {
    id: "r2",
    name: "Roadmap 2026.pdf",
    type: "file",
    size: 1_204_000,
    description: "Plan trimestral del equipo.",
    preview: "",
    uploadedAt: "2026-09-22",
  },
];

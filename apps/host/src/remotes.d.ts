declare module "feed/Catalog" {
  import type { ComponentType } from "react";

  const Catalog: ComponentType<{
    selectedArticleId?: string | null;
    onSelectArticle?: (id: string | null) => void;
  }>;

  export default Catalog;
}

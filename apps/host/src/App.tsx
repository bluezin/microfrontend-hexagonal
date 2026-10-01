import { lazy, Suspense, useState } from "react";

const Catalog = lazy(() => import("feed/Catalog"));

function App() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null,
  );

  return (
    <main>
      <h1>Host</h1>

      <Suspense fallback={<p>Cargando feed...</p>}>
        <Catalog
          selectedArticleId={selectedArticleId}
          onSelectArticle={setSelectedArticleId}
        />
      </Suspense>
    </main>
  );
}

export default App;

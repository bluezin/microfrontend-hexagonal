import { lazy, Suspense, useState } from "react";

const Catalog = lazy(() => import("feed/Catalog"));

function App() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null,
  );

  return (
    <main>
      <h1>Mamá en Casa</h1>
      <p>Esta es una página en donde se comparte información para mamás</p>
      <Suspense fallback={<p>Cargando feed...</p>}>
        <Catalog />
      </Suspense>
    </main>
  );
}

export default App;

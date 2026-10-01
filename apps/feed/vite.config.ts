import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "feed",
      filename: "remoteEntry.js",
      exposes: {
        "./mount": "./src/remote.tsx",
        "./Catalog": "./src/presentation/Catalog.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-dom/client": { singleton: true },
      },
    }),
  ],
  server: { port: 3001, strictPort: true },
  preview: { port: 3001, strictPort: true },
  build: { target: "esnext" },
});

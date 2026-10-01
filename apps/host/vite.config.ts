import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        feed: {
          type: "module",
          name: "feed",
          entry: "http://localhost:3001/remoteEntry.js",
        },
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-dom/client": { singleton: true },
      },
    }),
  ],
  server: { port: 3000, strictPort: true },
  build: { target: "esnext" },
});

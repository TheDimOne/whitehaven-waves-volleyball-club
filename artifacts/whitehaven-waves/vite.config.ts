import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "node:fs";

const port = Number(process.env.PORT || 5173);
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "whitehaven-home-route",
      closeBundle() {
        const outputDir = path.resolve(import.meta.dirname, "dist/public");
        const homeDir = path.join(outputDir, "home");
        fs.mkdirSync(homeDir, { recursive: true });
        fs.copyFileSync(path.join(outputDir, "index.html"), path.join(homeDir, "index.html"));
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: [".replit.dev", ".repl.co", "whitehavenwaves.co.uk", "www.whitehavenwaves.co.uk"],
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: [".replit.dev", ".repl.co", "whitehavenwaves.co.uk", "www.whitehavenwaves.co.uk"],
  },
});

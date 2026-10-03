import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { extname } from "node:path";

// Serve compiled multipage templates instead of Vite's SPA fallback in local previews.
function templatePages(): Plugin {
  const install = (server: { middlewares: ViteDevServer["middlewares"] }) => {
    server.middlewares.use((request, _response, next) => {
      if (request.url) {
        const url = new URL(request.url, "http://localhost");
        if (url.pathname.startsWith("/previews/") && !extname(url.pathname)) {
          request.url = `${url.pathname.replace(/\/$/, "")}/index.html${url.search}`;
        }
      }
      next();
    });
  };
  return { name: "template-pages", configureServer: install, configurePreviewServer: install };
}

export default defineConfig({
  plugins: [templatePages(), react(), tailwindcss()],
});

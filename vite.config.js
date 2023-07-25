import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: { https: true },
  plugins: [react(), mkcert()],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Design System aliases (mirrors storybook tsconfig paths)
      "components": path.resolve(__dirname, "./Design System/storybook/src/components"),
      "types": path.resolve(__dirname, "./Design System/storybook/src/types"),
      "hooks": path.resolve(__dirname, "./Design System/storybook/src/hooks"),
      "utils": path.resolve(__dirname, "./Design System/storybook/src/utils"),
      "styles": path.resolve(__dirname, "./Design System/storybook/src/styles"),
    },
  },
}));

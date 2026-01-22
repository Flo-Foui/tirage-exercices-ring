import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages, base must be "/<repo-name>/". We set it via BASE_PATH in CI.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
});

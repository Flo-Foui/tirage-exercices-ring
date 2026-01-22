import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    // For GitHub Pages: set BASE_PATH in CI to "/<repo-name>/"
    base: process.env.BASE_PATH ?? "/",
    plugins: [react()],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" permette di aprire la build anche da una sottocartella.
export default defineConfig({ plugins: [react()], base: "./" });

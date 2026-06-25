import { defineConfig } from "tsup";
import path from "path";

export default defineConfig({
    platform: "node",
    format: "esm",
    outDir: "dist",
    dts: true,
    splitting: false,
    sourcemap: true,
    external: ["@casa/types", "@casa/schemas"],
    alias: {
        "@": path.resolve(__dirname, "./src"),
    },
});

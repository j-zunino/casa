import { defineConfig } from "tsup";

export default defineConfig({
    platform: "node",
    format: "esm",
    outDir: "dist",
    dts: true,
    splitting: false,
    sourcemap: true,
});

import * as path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  return {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, "package.json"),
            dest: path.resolve(__dirname, "../../../dist/appenders/storage/"),
          },
          {
            src: path.resolve(__dirname, "../../../README.md"),
            dest: path.resolve(__dirname, "../../../dist/appenders/storage/"),
          },
        ],
      }),
      dts({ tsconfigPath: path.resolve(__dirname, "tsconfig.storage.json") }),
      nodePolyfills(),
    ],
    build: {
      outDir: path.resolve(__dirname, "../../../dist/appenders/storage/"),
      lib: {
        name: "StorageAppenders",
        entry: path.resolve(__dirname, "index.ts"),
        formats: ["es", "cjs", "umd"],
        fileName: "index",
      },
      rollupOptions: {
        external: [
          "@logback4js/core",
          "uuid",
        ],
        output: {
          globals: {
            "@logback4js/core": "core",
            uuid: "uuid",
          },
        },
      },
    },
  };
});

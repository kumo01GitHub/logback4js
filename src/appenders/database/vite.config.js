import * as path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { viteStaticCopy } from "vite-plugin-static-copy";


export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  return {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, "package.json"),
            dest: path.resolve(__dirname, "../../../dist/appenders/database/"),
          },
          {
            src: path.resolve(__dirname, "../../../README.md"),
            dest: path.resolve(__dirname, "../../../dist/appenders/database/"),
          },
        ],
      }),
      dts({ tsconfigPath: path.resolve(__dirname, "tsconfig.database.json") }),
      nodePolyfills(),
    ],
    build: {
      outDir: path.resolve(__dirname, "../../../dist/appenders/database/"),
      lib: {
        name: "DatabaseAppenders",
        entry: path.resolve(__dirname, "index.ts"),
        formats: ["es", "cjs", "umd"],
        fileName: "index",
      },
      rollupOptions: {
        // https://github.com/brianc/node-postgres/issues/2987
        external: [ "@logback4js/core", "mysql2", "pg-cloudflare", "pg", "sqlite3", "redis" ],
        output: {
          globals: {
            "@logback4js/core": "core",
            mysql2: "mysql2",
            pg: "pg",
            sqlite3: "sqlite3",
            redis: "redis",
          }
        }
      },
    },
  };
});

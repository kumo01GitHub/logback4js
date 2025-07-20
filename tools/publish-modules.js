const fs = require("node:fs");
const path = require("node:path");
const { parseArgs } = require("node:util");
const { execSync } = require("node:child_process");

/** Core module. */
const TARGET_CORE_MODULE = "core";
/** Appenders. */
const TARGET_APPENDERS = "appenders";
/** Project root directory. */
const ROOT_DIR = path.join(__dirname, "..");
/** Core module source directory. */
const CORE_SRC_DIR = path.join(ROOT_DIR, "src/core");
/** Appenders source directory. */
const APPENDERS_SRC_DIR = path.join(ROOT_DIR, "src/appenders");
/** Core module directory. */
const CORE_DIST_DIR = path.join(ROOT_DIR, "dist/core");
/** Appenders directory. */
const APPENDERS_DIST_DIR = path.join(ROOT_DIR, "dist/appenders");

/**
 * Publish a module. When module name is empty, publish core module.
 * @param name Module name
 */
async function publishModule(name) {
  const target =
    !name || name === TARGET_CORE_MODULE ? TARGET_CORE_MODULE : name;

  // Publish.
  console.info(`Publish ${target}`);
  if (target === TARGET_CORE_MODULE) {
    execFileSync("vite", [
      "build",
      "--config",
      path.join(CORE_SRC_DIR, "vite.config.js"),
    ]);
    return execFileSync("npm", ["publish", CORE_DIST_DIR, "--access=public"]);
  } else {
    execFileSync("vite", [
      "build",
      "--config",
      path.join(APPENDERS_SRC_DIR, target, "vite.config.js"),
    ]);
    return execFileSync("npm", [
      "publish",
      path.join(APPENDERS_DIST_DIR, target),
      "--access=public",
    ]);
  }
}

/**
 * Main process.
 */
function main() {
  // Parse arguments.
  const { values, positionals } = parseArgs({
    args: process.args,
    allowPositionals: true,
    options: {
      target: { type: "string", short: "t" },
    },
  });

  // Publish modules.
  if (!values.target) {
    // Publish core module.
    publishModule(TARGET_CORE_MODULE).then(() => {
      // Publish appenders.
      const dirs = fs.readdirSync(APPENDERS_SRC_DIR).filter((file) => {
        return fs.statSync(path.join(APPENDERS_SRC_DIR, file)).isDirectory();
      });
      dirs.forEach((dir) => {
        publishModule(dir);
      });
    });
  } else if (values.target === TARGET_APPENDERS) {
    // Publish appenders.
    const dirs = fs.readdirSync(APPENDERS_SRC_DIR).filter((file) => {
      return fs.statSync(path.join(APPENDERS_SRC_DIR, file)).isDirectory();
    });
    dirs.forEach((dir) => {
      publishModule(dir);
    });
  } else {
    publishModule(values.target);
  }
}

main();

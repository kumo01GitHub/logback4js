const fs = require("node:fs");
const path = require("node:path");
const { parseArgs } = require("node:util");
const runScript = require("@npmcli/run-script");


/** Core module. */
const TARGET_CORE_MODULE = "core";
/** Appenders. */
const TARGET_APPENDERS = "appenders";
/** Project root directory. */
const ROOT_DIR = path.join(__dirname, "..");
/** Core module directory. */
const CORE_DIR = path.join(ROOT_DIR, "dist/core");
/** Appenders directory. */
const APPENDERS_DIR = path.join(ROOT_DIR, "dist/appenders");
/** Appenders directory. */
const APPENDERS_DIR = path.join(ROOT_DIR, "dist/appenders");

/**
 * Publish a module. When module name is empty, publish core module.
 * @param name Module name
 */
async function publishModule(name) {
  const target =
    !name || name === TARGET_CORE_MODULE ? TARGET_CORE_MODULE : name;

  // Publish.
  console.info(`Publish ${target}`);
  runScript({
  event: `publish:${target}`,
  path: ROOT_DIR,
  });
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
    publishModule(TARGET_CORE_MODULE, values.release).then(() => {
      // Publish appenders.
      const dirs = fs.readdirSync(APPENDERS_DIR).filter((file) => {
        return fs.statSync(path.join(APPENDERS_DIR, file)).isDirectory();
      });
      dirs.forEach((dir) => {
        publishModule(dir, values.release);
      });
    });
  } else if (values.target === TARGET_APPENDERS) {
    // Publish appenders.
    const dirs = fs.readdirSync(APPENDERS_DIR).filter((file) => {
      return fs.statSync(path.join(APPENDERS_DIR, file)).isDirectory();
    });
    dirs.forEach((dir) => {
      publishModule(dir);
    });
  } else {
    publishModule(values.target);
  }
}

main();

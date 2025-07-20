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
/** Appenders directory. */
const APPENDERS_DIR = path.join(ROOT_DIR, "src/appenders");

/**
 * Build a module. When module name is empty, build core module.
 * @param name Module name
 */
async function buildModule(name) {
  const target =
    !name || name === TARGET_CORE_MODULE ? TARGET_CORE_MODULE : name;

  // Build.
  console.info(`Build ${target}`);
  return runScript({
    event: `build:${target}`,
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

  // Build modules.
  if (!values.target) {
    // Build core module.
    buildModule(TARGET_CORE_MODULE).then(() => {
      // Build appenders.
      const dirs = fs.readdirSync(APPENDERS_DIR).filter((file) => {
        return fs.statSync(path.join(APPENDERS_DIR, file)).isDirectory();
      });
      dirs.forEach((dir) => {
        buildModule(dir);
      });
    });
  } else if (values.target === TARGET_APPENDERS) {
    // Build appenders.
    const dirs = fs.readdirSync(APPENDERS_DIR).filter((file) => {
      return fs.statSync(path.join(APPENDERS_DIR, file)).isDirectory();
    });
    dirs.forEach((dir) => {
      buildModule(dir);
    });
  } else {
    buildModule(values.target);
  }
}

main();

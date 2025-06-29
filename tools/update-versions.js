const fs = require("node:fs");
const path = require("node:path");
const { parseArgs } = require("node:util");
const packageJson = require("@npmcli/package-json");
const semver = require("semver");

/** Core module. */
const TARGET_CORE_MODULE = "core";
/** Appenders. */
const TARGET_APPENDERS = "appenders";
/** Project root directory. */
const ROOT_DIR = path.join(__dirname, "..");
/** Core module directory. */
const CORE_DIR = path.join(ROOT_DIR, "src/core");
/** Appenders directory. */
const APPENDERS_DIR = path.join(ROOT_DIR, "src/appenders");
/** Release types. */
const RELEASE_TYPES = ["major", "minor", "patch"];

/**
 * Update a version of module. When module name is empty, update core module.
 * @param {string | undefined} name Module name
 * @param {"major" | "minor" | "patch"} release Release type
 */
async function updateVersion(name, release) {
  // Validate release type.
  if (!RELEASE_TYPES.includes(release)) {
    throw new Error("Invalid release type.");
  }

  // Load package.json.
  const pkgJson =
    !name || name === TARGET_CORE_MODULE
      ? await packageJson.load(CORE_DIR)
      : await packageJson.load(path.join(APPENDERS_DIR, name));

  // Current version.
  const current = pkgJson.content.version;
  // Updated version.
  const updated = semver.inc(current, release);

  // Update package.json.
  console.info(`Update ${pkgJson.content.name}: ${current} -> ${updated}`);
  if (!name || name === TARGET_CORE_MODULE) {
    pkgJson.update({ version: updated });
  } else {
    pkgJson.update({ version: updated });
    pkgJson.update({
      dependencies: {
        ...pkgJson.content.dependencies,
        "@logback4js/core": `^${updated}`,
      },
    });
  }
  await pkgJson.save();
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
      release: { type: "string", short: "r" },
    },
  });

  // Update versions.
  if (!values.target) {
    // Update core module.
    updateVersion(TARGET_CORE_MODULE, values.release).then(() => {
      // Update appenders.
      const dirs = fs.readdirSync(APPENDERS_DIR).filter((file) => {
        return fs.statSync(path.join(APPENDERS_DIR, file)).isDirectory();
      });
      dirs.forEach((dir) => {
        updateVersion(dir, values.release);
      });
    });
  } else if (values.target === TARGET_APPENDERS) {
    // Update appenders.
    const dirs = fs.readdirSync(APPENDERS_DIR).filter((file) => {
      return fs.statSync(path.join(APPENDERS_DIR, file)).isDirectory();
    });
    dirs.forEach((dir) => {
      updateVersion(dir, values.release);
    });
  } else {
    updateVersion(values.target, values.release);
  }
}

main();

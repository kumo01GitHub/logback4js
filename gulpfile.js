const gulp = require('gulp');
const { createProject } = require('gulp-typescript');

const fs = require('fs');
const path = require('path');


/** Core module. */
const CORE_MODULE = "core";

/** License file. */
const LISENCE = "LICENSE";
/** Readme file. */
const README = "README.md";

/**
 * Logging message.
 * 
 * @param {*} module Module name.
 * @param {*} msg Message.
 */
function log(module, func, msg) {
    
}

/**
 * Build module.
 * 
 * @param {*} module Module name.
 */
function buildModule(module) {
    let tsconfig = "";
    let dest = "";
    let package_json = "";

    if (!module) {
        throw new Error("Module not specified.");
    } else {
        console.log(`[${module}] Build start.`);
        if (module === CORE_MODULE) {
            // Core module.
            tsconfig = "src/core/tsconfig.core.json";
            dest = "dist/core/";
            package_json = "src/core/package.json";
        } else {
            // Appender.
            tsconfig = `src/appenders/${module}/tsconfig.${module}.json`;
            dest = `dist/appenders/${module}/`;
            package_json = `src/appenders/${module}/package.json`;
        }
    }

    if (!fs.existsSync(tsconfig)) {
        throw new Error(`tsconfig does not exist.: ${tsconfig}`);
    }

    // Clean destination.
    console.log(`[${module}] Clean.: ${dest}`);
    fs.rmSync(dest, { recursive: true, force: true });
    fs.mkdirSync(dest, { recursive: true });

    // Transpile module.
    console.log(`[${module}] Transpile.`);
    const tsProject = createProject(tsconfig);
    tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest(dest));

    // Copy files.
    console.log(`[${module}] Copy files.`);
    fs.copyFileSync(package_json, path.join(dest, path.basename(package_json)));
    fs.copyFileSync(LISENCE, path.join(dest, path.basename(LISENCE)));
    fs.copyFileSync(README, path.join(dest, path.basename(README)));
}

/**
 * Gulp task: build core module.
 * 
 * @param {*} cb Callback.
 */
function buildCore(cb) {
    buildModule(CORE_MODULE);
    cb();
}

/**
 * Gulp task: build angular appenders.
 * 
 * @param {*} cb Callback.
 */
function buildAngular(cb) {
    buildModule("angular");
    cb();
}

/**
 * Gulp task: build discord appenders.
 * 
 * @param {*} cb Callback.
 */
function buildDiscord(cb) {
    buildModule("discord");
    cb();
}

/**
 * Gulp task: build google analytics appenders.
 * 
 * @param {*} cb Callback.
 */
function buildGoogleAnalytics(cb) {
    buildModule("google-analytics");
    cb();
}

/**
 * Gulp task: build line appenders.
 * 
 * @param {*} cb Callback.
 */
function buildLine(cb) {
    buildModule("line");
    cb();
}

/**
 * Gulp task: build microsoft appenders.
 * 
 * @param {*} cb Callback.
 */
function buildMicrosoft(cb) {
    buildModule("microsoft");
    cb();
}

/**
 * Gulp task: build slack appenders.
 * 
 * @param {*} cb Callback.
 */
function buildSlack(cb) {
    buildModule("slack");
    cb();
}

/**
 * Gulp task: build twitter appenders.
 * 
 * @param {*} cb Callback.
 */
function buildTwitter(cb) {
    buildModule("twitter");
    cb();
}

// Gulp tasks.
exports.core = buildCore;
exports.angular = buildAngular;
exports.discord = buildDiscord;
exports.googleAnalytics = buildGoogleAnalytics;
exports.line = buildLine;
exports.microsoft = buildMicrosoft;
exports.slack = buildSlack;
exports.twitter = buildTwitter;

exports.default = gulp.parallel(
    buildCore,
    buildAngular,
    buildDiscord,
    buildGoogleAnalytics,
    buildLine,
    buildMicrosoft,
    buildSlack,
    buildTwitter
);

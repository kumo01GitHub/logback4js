/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{ useESM: true }],
  },
  moduleNameMapper: {
    "@logback4js/core": "<rootDir>/dist/core"
  },
  modulePathIgnorePatterns: [ "src/core/package.json" ]
};
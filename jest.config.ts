import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src/express/app";
const baseTestDir = "<rootDir>/src/project/test";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*.ts`],
};

export default config;

import { Config } from "jest";

const jestConfig: Config = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    "(.+\\.ts)": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};

export default jestConfig;

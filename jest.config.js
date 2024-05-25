module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "ts",
    "vue"
  ],
  transform: {
    ".*\\.(vue)$": "@vue/vue3-jest",
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    }
  },
  testEnvironment: "jsdom"
};

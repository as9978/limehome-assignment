module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  moduleDirectories: ["node_modules", "./src/utils", __dirname],
  setupFiles: ["./src/utils/mock.js"],
};

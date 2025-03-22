// frontend/jest.expo.config.js
module.exports = {
    preset: "jest-expo",
    testTimeout: 30000,
    modulePathIgnorePatterns: ["<rootDir>/backend/"], // Ignore backend folder
};
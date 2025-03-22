// backend/jest.backend.config.js
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testTimeout: 30000,
    modulePathIgnorePatterns: ["<rootDir>/frontend/"], // Ignore frontend folder
};
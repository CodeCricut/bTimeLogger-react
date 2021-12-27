// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    collectCoverage: true,
    coverageDirectory: "coverage", // server/coverage
    moduleFileExtensions: ["js", "mjs"],
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.mjs$": "babel-jest",
    },
    testRegex: "((\\.|/*.)(test))\\.js?$",
    rootDir: "server",
};

export default config;

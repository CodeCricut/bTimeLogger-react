// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    collectCoverage: true,
    moduleFileExtensions: ["js", "mjs"],
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.mjs$": "babel-jest",
    },
    testRegex: "((\\.|/*.)(test))\\.js?$",
};

export default config;

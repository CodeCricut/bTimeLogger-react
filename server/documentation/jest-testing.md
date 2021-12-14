# Jest Testing

[Jest](https://jestjs.io/) is a JavaScript testing framework used to write unit tests for this project.

To get started, follow [this guide](https://jestjs.io/docs/getting-started).

**Installing**:

```cli
npm install --save-dev jest
```

**Configuration**:

Jest's configuration can be defined in the `package.json`, or through a `jest.config.js` file.

We have opted for the `package.json` choice with the following configurations:

```json
"jest": {
    "testEnvironment": "node",
    "collectCoverage": true,
    "moduleFileExtensions": [
        "js",
        "mjs"
    ],
    "transform": {
        "^.+\\.js$": "babel-jest",
        "^.+\\.mjs$": "babel-jest"
    },
    "testRegex": "((\\.|/*.)(test))\\.js?$"
}
```

**Running tests**:

Run the tests with the `jest` command or `npm run test`.

Since we configured Jest to use `babel-jest`, the Babel tranpilation will automatically be applied before running our tests.

## Babel Configuration

Jest doesn't support ES6 natively, so a transpiler like Babel must be used.

Using Jest with Babel requires some additional configuration. See our [Babel documentation](./babel.md) for more.

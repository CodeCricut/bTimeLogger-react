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

Run all tests with the `jest` command or `npm run test`.

Run specific tests with `npm run test -- -t "<describe string> <test string>"`. For example, to test the following block, you would run `npm run test -- -t "stop should set end"`:

```js
describe("stop", () => {
    test("should set end time to now", async () =>
...
```

Since we configured Jest to use `babel-jest`, the Babel tranpilation will automatically be applied before running our tests.

**Debugging tests**:

To debug tests, open a new JavaScript Debug Terminal and run `npm test --watch`.

Debug specific specific tests, open the JS Debug Terminal and run `npm test --watch -- -t "<describe string> <test string>"`. For example, to test the following block, you would run `npm test --watch -- -t "stop should set end time to now"`:

```js
describe("stop", () => {
    test("should set end time to now", async () =>
...
```

## Babel Configuration

Jest doesn't support ES6 natively, so a transpiler like Babel must be used.

Using Jest with Babel requires some additional configuration. See our [Babel documentation](./babel.md) for more.

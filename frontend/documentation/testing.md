# Testing

This project was built with [Create React App](https://create-react-app.dev/), which comes with a test suite built-in. Internally, the app uses [Jest](https://jestjs.io/docs/expect) as a testing framework.

More details can be found in this [Create React App doc](https://create-react-app.dev/docs/running-tests/).

**Prerequisites**:

In order for tests to be run, they must be located somewhere within the `/src` directory. For this reason, test files are located directly
in the directory of the files they test.

**Run tests**: Testing can be done with

```cli
npm run test
```

This will launch Jest in watch mode. Every time you save a file, it will re-run the tests.

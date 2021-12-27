# BTimeLogger React Frontend

**Description**: BTimeLogger React Frontend is a web app which allows users to track and analyze how they spend their time on a daily basis.

The app is a single-page web app built with [React](https://reactjs.org/) and the the
[MUI](https://mui.com/) component library.

The app interacts with a custom REST API found in the `server` project. For more information, see the server project's [README](../server/README.md).

**Project status**: feature-incomplete, not fully tested, test failures, and known bugs

**Author**: Andrew Richerson

## Running the Website

The server must be running before you can use the frontend app.

For more information on running the app, see the [root project's README](../README.md).

**Debugging**:

For detailed instructions on debugging the app, see the [VS Code docs](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial#_debugging-react).

Once the `.vscode/launch.json` file is present, open a new VS Code Javascript Debug Terminal and run `npm run start`, then press
`F5` or the green arrow in the Debug menu of VS Code.

**Stopping the app**: To stop the app, run `^C` (Ctrl+C).

## Dependencies

Dependency details can be found in the "dependencies" section of [package.json](./package.json).

The main dependencies of the solution include

-   [React](https://www.npmjs.com/package/react) - web app framework
-   [Axios](https://www.npmjs.com/package/axios) - HTTP client for interacting with REST API
-   [MUI](https://mui.com/) - React UI library

## Software Architecture

The entry point of the application is [src/index.js](./src/index.js). It is responsible for:

-   rendering the React component tree in the `root` element of the HTML document
-   configuring global defaults
-   importing globally used fonts and other resources

### Components

The app is built up of modular React "components" found in the `src/components` directory.

The main component is the `App` component.

### State Management

Details about local and global state management can be found in [`state-management.md`](./documentation/tutorials/state-management.md)

### API interaction

API interaction is done through the "repository" classes (`ActivityRepository` and `ActivityTypeRepository`.) To achieve the interaction, the Axios library is used.

### Style

Information about styling can be found in our [MUI documentation](./documentation/tutorials/mui.md).

## Testing & Test Results

The frontend has not been fully tested. Additional UI and unit tests are planned
to achieve near 100% coverage and passing rate.

**Test results**: not fully tested, test failures. The latest test results can be found in [`documentation/test-results.md`](./documentation/test-results.md).

**Run all tests**: Run all tests with `npm run test`.

More information on test design and running the test suite can be found in [`documentation/tutorials/testing.md`](./documentation/tutorials/testing.md)

## Documentation

[JSDoc 3](https://jsdoc.app/about-getting-started.html) is used to document the app. The generated documentation website can be found at `/documentation/jsdocs/index.html`.

Alternatively, the documentation can be found at the `/docs/frontend` endpoint of the app.

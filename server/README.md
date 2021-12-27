# BTimeLogger React Server

**Description**: BTimeLogger React Server is a REST API which is used
as the backend for a React website.

**Project status**: feature-complete, fully tested, no test failures, and no known bugs

**Author**: Andrew Richerson

## Running the Server

**Prerequisites**: The following softwares must be installed before the server can run:

-   [Node.js](https://nodejs.org/en/)
-   [MongoDB](https://www.mongodb.com/)

**Installing dependencies**: The first time you run the server, you will have to install dependencies first with

```
npm install
```

**Starting the server**: To run the server, run

```
npm run start
```

**Debugging**: To debug, open a new JavaScript Debug Terminal in VSCode and run

```
npm run debug
```

**Stopping the server**: To stop the server, run `^C` (Ctrl+C).

## Dependencies

Dependency details can be found in the "dependencies" section of [package.json](./package.json).

The main dependencies of the solution include

-   [Express](https://www.npmjs.com/package/express) - web framework used to set up API routes
-   [Mongoose](https://www.npmjs.com/package/mongoose) - object modeling for MongoDB, providing database layer for the app
-   [Cors](https://expressjs.com/en/resources/middleware/cors.html) - Express middleware for enabling CORS
-   [Dotenv](https://www.npmjs.com/package/dotenv) - supports loading configuration from `.env` file (such as PORT number)

## Software Architecture

The entry point of the application is [src/index.js](./src/index.js). It is responsible for:

-   connecting to the MongoDB
-   configuring the API routes to use
-   listening for requests to the API routes and handling appropriately

### Database Model

**Model objects can be found in the [model](./src/model) directory.**

Mongoose is used to connect the application to a Mongo database. More information on Mongoose can be found in [our Mongoose database documentation](./documentation/tutorials/mongoose-database.md).

### Routing and Routers

**Routers can be found in the [routers](./src/routers) directory.**

Routing refers to "determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on)" (expressjs.com).

Routing is done with the help of the [Express.js](expressjs.com) framework. Additional details can be found in [our Express routing documentation](./documentation/tutorials/express-routing.md).

### Database interaction

All business logic pertaining to database interaction is done through "repository" classes found in the [repositories directory](./src/repositories).

No business logic is performed directly through the routers.

## Testing & Test Results

The server has been fully tested using automated unit and integration tests.

**Test results**: fully tested, no test failures. The latest test results can be found in [`documentation/test-results.md`](./documentation/test-results.md).

**Run all tests**: Run all tests with `npm run test`.

More information on test design and running the test suite can be found in
our [jest testing documentation](./documentation/tutorials/jest-testing.md).

## Documentation

[JSDoc 3](https://jsdoc.app/about-getting-started.html) is used to document the app. The generated documentation website can be found at `/documentation/jsdocs/index.html`.

Alternatively, the documentation can be found at the `/docs/server` endpoint of the app.

### Swagger API Specification

[Swagger](https://swagger.io/) is used to document the API specification. You can
view the Swagger UI at the `/docs/api` endpoint of the app.

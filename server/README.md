# BTimeLogger React Server

**Description**: BTimeLogger React Server is a REST API which is used
as the backend for a React website.

**Project status**: feature-incomplete, not fully tested, test failures, and known bugs

**Author**: Andrew Richerson

## Running the Server

**Prerequisites**: The following softwares must be installed before the server can run:

-   [Node.js](https://nodejs.org/en/)
-   [MongoDB](https://www.mongodb.com/)

**Starting the server**: To run the server, run

```
npm run start
```

**Stopping the server**: To stop the server, run `^C` (Ctrl+C).

## Dependencies

Dependency details can be found in the "dependencies" section of `package.json`.

The main dependencies of the solution include

-   [Express](https://www.npmjs.com/package/express) - web framework used to set up API routes
-   [Mongoose](https://www.npmjs.com/package/mongoose) - object modeling for MongoDB, providing database layer for the app
-   [Cors](https://expressjs.com/en/resources/middleware/cors.html) - Express middleware for enabling CORS
-   [Dotenv](https://www.npmjs.com/package/dotenv) - supports loading configuration from `.env` file (such as PORT number)

## Software Architecture

The entry point of the application is `index.js`. It is responsible for:

-   connecting to the MongoDB
-   configuring the API routes to use
-   listening for requests to the API routes and handling appropriately

## Testing & Test Results

### Manual System Tests

### Unit Tests

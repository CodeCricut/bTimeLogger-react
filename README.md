# BTimeLogger React

**Description**: BTimeLogger React is a web app which allows users to track and analyze how they spend their time on a daily basis.
It consists of a REST API and React frontend.

**Project status**: feature-incomplete, not fully tested, no test failures, and known bugs

**Author**: Andrew Richerson

## Live Website

You can find the live website at https://btimelogger-react.herokuapp.com/.

## Running the app

The app is a combo of two projects: the backend server and the frontend UI. The backend server serves
the UI as a static website from the base endpoint (`/`) of the app.

**Prerequisites**: The following softwares must be installed before the app can run:

-   [Node.js](https://nodejs.org/en/)
-   [MongoDB](https://www.mongodb.com/)

**Building the frontend**

The first time you run the app, you must build the frontend website so it may be served:

```cli
cd frontend
npm install --only=production
npm run build
```

**Running the app**

After the frontend is built, you may run the app locally with

```cli
npm run start
```

**Debugging the app**

If you would like to debug the app, open up a new Javascript Debug Terminal in VS Code and run

```cli
npm run debug
```

**Stopping the app**: To stop the app, run `^C` (Ctrl+C)

## Server (REST API)

The server also contains the entry point of the application [`./server/src/index.js`](./server/src/index.js).

More information can be found in the [Server's README](./server/README.md).

## Frontend (React App)

The frontend project contains the source files for the React UI. To build the static website to be served
by the server, run `npm run build` in the frontend directory.

More information can be found in the [Frontend's README](./frontend/README.md).

## Testing & Test Results

**Test results**:
Test results can be found in the documentaiton of each project. See each project's README for more information.

**Run all tests**:
You can run tests for the frontend and server separately. See each project's README for more information.

## Documentation

To generate a jsDoc website for each project, run `npm run generate-docs`.

The exact locations of supporting documentation can be found in each project's README.

Alternatively, documentation can be found on the website itself at the following endpoints:

-   `/docs/api` - Swagger interface for interacting with the API
-   `/docs/server` - jsDocs for the server project
-   `/docs/frontend` - jsDocs for the frontend project

# BTimeLogger React Server

**Description**: BTimeLogger React Server is a REST API which is used
as the backend for a React website.

**Project status**: feature-incomplete, not fully tested, test failures, and known bugs

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

### Database Model

**Model objects can be found in the `model` directory.**

Mongoose is used to connect the application to a Mongo database. Mongo is a NoSQL database.

In Mongo, related data is stored in "documents." A document might be something like `Note`, which represents a single note object. "**Schema**" define the structure of our documents.

For example, a note schema might look like this:

```js
const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
});
```

Related documents are stored together in "Collections."

A **Model** is a class which lets us interact with a collection in the database.

```js
const Note = mongoose.model("Note", NoteSchema);
```

Models have methods to interact with the collection:

```js
const noteById = await Note.findById(id);
const allNotes = await Note.find();

const newNote = new Note({ title: "Title", description: "Desc" });
await newNote.save();
```

More information can be found in this [tutorial](https://rahmanfadhil.com/express-rest-api/) or the [Mongoose docs](https://mongoosejs.com/docs/guide.html).

### Routing and Routers

**Routers can be found in the `routers` directory.**

Routing refers to "determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on)" (expressjs.com).

**Basic routing**:

The simplest route possible in Express would look like this:

```js
app.get("/", (request, response) => {
    response.send("Hello world");
});
```

Any GET request to the base address would return 'Hello world'.

Other possible route definitions include:

```js
app.post(PATH, HANDLER); // handle a POST request
app.put(PATH, HANDLER); // handle a PUT request
app.delete(PATH, HANDLER); // handle a DELETE request
```

**Route parameters**:

You can define routes with parameters like this:

```js
app.get("/users/:userId/books/:bookId", (req, res) => {
    const { userId, bookId } = req.params;
    // ...
});
```

**Routers**:

The `express.Router` class is used to create modular route handlers. It works
in the exact same way as routing with the `app` object did, except it can be mounted to the app to handle all requests at a certain path.

In our app, we have two routers:

1. `routers/activities.js` - handles requests made to `/activities`
2. `routers/types.js` - handles requests made to `/types`

Each of those routers defines its own route handlers:

```js
// activities.js
const router = express.Router();

// Handles GET requests to /activities/:id
router.get("/:id", (req, res) => {
    // ..
});

export default router;
```

The app then defines what "parent routes" to use for each router:

```js
// index.js
import activitiesRouter from "./routers/activities.js";

// Any request starting with /activities will be handled by the activities router
app.use("/activities", activitiesRouter);
```

More information can be found in this [tutorial](https://rahmanfadhil.com/express-rest-api/) or the [Express docs](https://expressjs.com/).

## Testing & Test Results

The server app currently contains no tests, manual or automatic.

Undocumented ad-hoc manual tests have been performed.

### Manual System Tests

Manual system tests exercising the API are planned.

### Unit Tests

Automated unit tests exercising the components of the application such as
database models and routers are planned.

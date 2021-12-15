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

**Stopping the server**: To stop the server, run `^C` (Ctrl+C).

## Dependencies

Dependency details can be found in the "dependencies" section of `package.json`.

The main dependencies of the solution include

-   [Express](https://www.npmjs.com/package/express) - web framework used to set up API routes
-   [Mongoose](https://www.npmjs.com/package/mongoose) - object modeling for MongoDB, providing database layer for the app
-   [Cors](https://expressjs.com/en/resources/middleware/cors.html) - Express middleware for enabling CORS
-   [Dotenv](https://www.npmjs.com/package/dotenv) - supports loading configuration from `.env` file (such as PORT number)

## Software Architecture

The entry point of the application is `src/index.js`. It is responsible for:

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

Mongoose assigns each schema an `_id` property which can be used to uniquely reference it.

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

More information can be found in [this tutorial](https://rahmanfadhil.com/express-rest-api/) or the [Mongoose docs](https://mongoosejs.com/docs/guide.html).

### Routing and Routers

**Routers can be found in the `routers` directory.**

Routing refers to "determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on)" (expressjs.com).

Routing is done with the help of the [Express.js](expressjs.com) framework. Additional details can be found in [our Express routing documentation](./documentation/express-routing.md).

## Testing & Test Results

The server app currently contains no tests, manual or automatic.

Undocumented ad-hoc manual tests have been performed.

### Manual System Tests

Manual system tests exercising the API are planned.

### Unit Tests

Automated unit tests exercising the components of the application such as
database models and routers are planned.

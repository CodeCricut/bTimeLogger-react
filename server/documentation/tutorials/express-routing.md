# Express Routing

Routing refers to "determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on)" (expressjs.com).

Routing is done with the help of the [Express.js](expressjs.com) framework.

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

1. [`routers/activities.js`](../src/routers/activities.js) - handles requests made to `/activities`
2. [`routers/types.js`](../src/routers/types.js) - handles requests made to `/types`

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

**Error handling**:

Express supports middleware functions to "inject" functionality into the application's request-response pipeline. More information can be found in the [docs](https://expressjs.com/en/guide/using-middleware.html).

Both the activity and activity type routers use error handling middleware to catch errors thrown within the route handlers.

An error handler is expressed as so:

```js
router.use((err, req, res, next) => {
    // handle error
    res.status(500);
    res.send(err.message);
});
```

Error middleware should be defined after the handlers they are supposed to act upon.

In order to call the error handler when an error is thrown, the route handlers need to accept a `next` parameter to the handling callback. This `next` which will call the next middleware in the pipeline (the error handler, in our case):

```js
router.METHOD("ROUTE", (req, res, next) => {
    try {
        // ...
    } catch (e) {
        next(e);
    }
});
```

For more information on error handling middleware, see this [tutorial](https://www.robinwieruch.de/node-express-error-handling/).

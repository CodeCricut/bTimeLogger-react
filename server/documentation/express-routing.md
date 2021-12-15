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

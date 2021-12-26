# Swagger API Docs

[Swagger](https://swagger.io/) is a system for designing and documenting REST APIs. It uses the OpenAPI specification
for definining the API.

### Swagger Documents

Swagger documents can be defined using YAML documents. [editor.swagger.io](https://editor.swagger.io/) provides a useful interface
for creating such documents.

### Swagger Specification

The [Swagger specification](https://swagger.io/specification/) defines the structure, types, and formatting of Swagger documents.

Important parts of the specification are listed below:

**OpenAPI Object**: This is the root document object.

```yaml
openapi: "3.0.0"
info:
    description: "Description..."
    version: "1.0.0"
    title: "MyAPI Title"
paths: ...
components: ...
```

**Components Object**: Contains the schemas for the specification

```yaml
components:
    schemas:
        Activity:
            type: "object"
            required:
                - _id
                - type
                - trashed
            properties:
                _id:
                    type: "string"
                type:
                    type: "string"
                    description: "The ID of the activity type associated with this activity."
                comment:
                    type: "string"
                    description: "Optional user comment associated with this activity."
                startTime:
                    type: "string"
                    format: "date-time"
                    description: "When the activity was started."
                endTime:
                    type: "string"
                    format: "date-time"
                    description: "When the activity was ended."
                trashed:
                    type: "boolean"
                __v:
                    type: "integer"
    responses:
        ActivityResponse:
            description: "Single activity"
            content:
                application/json:
                    schema:
                        $ref: "#/components/schemas/Activity"
    requestBodies:
        PostType:
            description: "Body for posting an activity type"
            content:
                application/json:
                schema:
                    type: "object"
                    properties:
                    name:
                        type: "string"
```

## Documenting Express Apps with Swagger

Express is the framework used to create an API with Node. We can express the
API with Swagger.

**Dependencies**:

A few dependencies are required:

```cli
npm i swagger-ui-express swagger-jsdoc
```

`swagger-jsdoc` is used to generate swagger/openapi specification based on jsDoc comments and YAML files.

`swagger-ui-express` is used to generate a UI for the specification and serve it
using Express.

**Generating the Specification**:

`swagger-jsdoc` requires some setup to define how to generate our specification.

We could do this in `index.js`, but we have chosen to do it in `swagger.config.js`:

```js
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "bTimeLogger API",
        version: "1.0.0",
    },
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ["./src/routers/*.js", "./src/api-docs/*.yaml"],
};

// Specification equivalent to a swagger.json file
const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
```

**Serving the Swagger UI**:

We can serve the Swagger UI using with `swagger-ui-express`. We have opted to use
a router (`docs.js`):

```js
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../swagger.config.js";

const router = express.Router();

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerSpec));

export default router;
```

Then we serve it at the `/docs` endpoint:

```js
import docsRouter from "./routers/docs.js";
...
app.use("/docs", docsRouter);
```

**Defining the Specification**:

`swagger-jsdoc` allows us to define the speficitation in two ways:

1. YAML documents

We can define the speficiation in the traditional ways using YAML documents. You
can include multiple documents, as long as their paths are included in the `apis`
property of the options object:

```js
const options = {
    ...
    // Paths to files containing OpenAPI definitions
    apis: ["./src/routers/*.js", "./src/api-docs/*.yaml"],
};
```

`src/api-docs/definitions.yaml`:

```yaml
components:
    requestBodies: ...
```

2. jsDoc comments

We can also define them in jsDoc comments. Note that the source files must be
included in the `apis` property of the options object.

```js
/**
 * @swagger
 * /:
 *   get:
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: hello world
 */
app.get("/", (req, res) => {
    res.send("Hello World!");
});
```

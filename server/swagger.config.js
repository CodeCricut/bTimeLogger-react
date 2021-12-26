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
    apis: ["./src/routers/*.js", "./src/api-docs/definitions.yaml"],
};

// Specification equivalent to a swagger.json file
const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };

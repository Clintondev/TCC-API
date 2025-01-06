//src/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CI/CD Demo API",
            version: "1.0.0",
            description: "API de exemplo para demonstrar práticas de CI/CD com Swagger"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor Local"
            }
        ]
    },
    apis: ["./src/server.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
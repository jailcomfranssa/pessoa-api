const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Pessoas",
            version: "1.0.0",
            description: "Documentação da API de Pessoas com Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.js"], // Caminho para os comentários JSDoc
};

module.exports = swaggerJSDoc(options);

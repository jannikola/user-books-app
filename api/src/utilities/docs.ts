import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
    swagger: '2.0',
    info: {
        title: 'BOOKS API DOCUMENTATION',
        version: '1.0.0',
    },
    host: "localhost:8080",
    basePath: "/api/v1",
    securityDefinitions: {
        bearerAuth: {
            name: "Authorization",
            in: "header",
            type: "apiKey",
            description: "JWT Authorization header"
        }
    },
    security: [{ bearerAuth: [] }]
};

export default swaggerDefinition;

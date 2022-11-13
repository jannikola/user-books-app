import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'BOOKS API DOCUMENTATION',
        version: '1.0.0',
    },
    servers: [
        {
            url: `http://localhost:8080/api/v1`,
        },
    ],
};

export default swaggerDefinition;

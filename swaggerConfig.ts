// src/swaggerConfig.ts
import swaggerJsdoc from 'swagger-jsdoc';

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

export const specs = swaggerJsdoc(options);

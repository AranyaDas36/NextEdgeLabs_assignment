import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'NextEdge Backend API',
    version: '1.0.0',
    description: 'API documentation for NextEdge Backend',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Path to the API docs (JSDoc in routes)
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: any) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
} 
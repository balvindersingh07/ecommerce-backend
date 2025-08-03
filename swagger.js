const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce Backend API',
      version: '1.0.0',
      description: 'API documentation for the Ecommerce application',
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price', 'image', 'category'],
          properties: {
            name: { type: 'string', example: 'iPhone 13' },
            price: { type: 'number', example: 999.99 },
            image: { type: 'string', example: 'https://example.com/image.jpg' },
            category: { type: 'string', example: 'electronics' },
          },
        },
        CartItem: {
          allOf: [
            { $ref: '#/components/schemas/Product' },
            {
              type: 'object',
              properties: {
                quantity: { type: 'number', example: 1 },
              },
            },
          ],
        },
        FavoriteItem: {
          $ref: '#/components/schemas/Product',
        },
        WishlistItem: {
          $ref: '#/components/schemas/Product',
        },
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            password: { type: 'string', example: 'secret123' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'jwt-token-here' },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], // Make sure all route files have Swagger comments
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerDocs;

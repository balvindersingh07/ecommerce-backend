// swagger.js
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce Backend API',
      version: process.env.npm_package_version || '1.0.0',
      description: 'API documentation for the Ecommerce application',
    },
    servers: [
      { url: process.env.BASE_URL || 'http://localhost:3000' }, // main app (GET /products, etc.)
      { url: process.env.API_URL || 'http://localhost:8080' },  // optional second app (if you split APIs)
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // Use absolute globs so it also works on Render/Vercel
  apis: [
    path.join(__dirname, 'routes/*.js'),
    path.join(__dirname, 'routes/**/*.js'),
  ],
};

const specs = swaggerJsdoc(options);

module.exports = function swaggerDocs(app) {
  // Raw JSON (useful for Postman / CI)
  app.get('/api-docs.json', (_req, res) => res.json(specs));

  // Swagger UI
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      swaggerOptions: { persistAuthorization: true },
      customCss: '.swagger-ui .topbar { display: none }',
    })
  );
};

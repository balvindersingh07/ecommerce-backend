// swagger.js
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = function swaggerDocs(app) {
  // Build public URL from env (Render ‘RENDER_EXTERNAL_URL’ works too)
  const PORT = process.env.PORT || 10000;
  const base =
    (process.env.BASE_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`).replace(/\/+$/, '');
  const apiPrefix = (process.env.API_PREFIX || '/api/v1').replace(/\/?$/, ''); // ensure leading slash, no trailing

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Ecommerce Backend API',
        version: process.env.npm_package_version || '1.0.0',
        description: 'API documentation for the Ecommerce application',
      },
      // Offer both roots; choose in the Swagger UI dropdown if needed
      servers: [
        { url: base, description: 'Root' },
        { url: `${base}${apiPrefix}`, description: 'Versioned root' },
      ],
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    // Absolute globs so it works on Render
    apis: [
      path.join(__dirname, 'routes/*.js'),
      path.join(__dirname, 'routes/**/*.js'),
    ],
  };

  const specs = swaggerJsdoc(options);

  // JSON spec (useful for Postman/CI)
  app.get('/api-docs.json', (_req, res) => res.json(specs));

  // Swagger UI — keep BEFORE any catch-all
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      swaggerOptions: { persistAuthorization: true },
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Ecommerce API Docs',
    })
  );
};

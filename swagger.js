// swagger.js
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = function swaggerDocs(app) {
  const PORT = process.env.PORT || 10000;
  const base =
    (process.env.BASE_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`).replace(/\/+$/, '');
  const apiPrefix = (process.env.API_PREFIX || '/api/v1').replace(/\/?$/, '');

  const specs = swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Ecommerce Backend API',
        version: process.env.npm_package_version || '1.0.0',
        description: 'API documentation for the Ecommerce application',
      },
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
    apis: [
      path.join(__dirname, 'routes/*.js'),
      path.join(__dirname, 'routes/**/*.js'),
    ],
  });

  // JSON spec (Postman/CI)
  app.get('/api-docs.json', (_req, res) => res.json(specs));

  // ---- Swagger UI (force both paths) ----
  const ui = swaggerUi.setup(specs, {
    explorer: true,
    swaggerOptions: { persistAuthorization: true },
    customCss: '.swagger-ui .topbar{display:none}',
    customSiteTitle: 'Ecommerce API Docs',
  });

  // Serve static assets for both /api-docs and /docs
  app.use('/api-docs', swaggerUi.serve);
  app.use('/docs', swaggerUi.serve);

  // Explicit GET handlers (fixes trailing-slash & routing quirks)
  app.get('/api-docs', ui);
  app.get('/api-docs/', ui);
  app.get('/docs', ui);
  app.get('/docs/', ui);

  // Tiny probe (optional): hit to confirm route order
  app.get('/__ping-docs', (_req, res) => res.send('docs-ok'));
};

// swagger.js
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

module.exports = function swaggerDocs(app) {
  const PORT = process.env.PORT || 10000;
  const base = (process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || `http://localhost:${PORT}`)
    .replace(/\/+$/, '');
  const apiPrefix = (process.env.API_PREFIX || '/api/v1').replace(/\/?$/, '');

  const specs = swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Ecommerce Backend API',
        version: process.env.npm_package_version || '1.0.0',
        description: 'API documentation for the Ecommerce application'
      },
      servers: [
        { url: base, description: 'Root' },
        { url: `${base}${apiPrefix}`, description: 'Versioned root' }
      ],
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
        }
      },
      security: [{ bearerAuth: [] }]
    },
    apis: [
      path.join(__dirname, 'routes/*.js'),
      path.join(__dirname, 'routes/**/*.js')
    ]
  });

  // JSON spec (helpful for testing)
  app.get('/api-docs.json', (_req, res) => res.json(specs));

  // Swagger UI (mount before any catch-all)
  const ui = swaggerUi.setup(specs, {
    explorer: true,
    swaggerOptions: { persistAuthorization: true },
    customCss: '.swagger-ui .topbar{display:none}',
    customSiteTitle: 'Ecommerce API Docs'
  });

  app.use('/api-docs', swaggerUi.serve, ui);
  app.use('/docs', swaggerUi.serve, ui); // optional alias
};

// swagger.js
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

module.exports = function swaggerDocs(app) {
  const PORT = process.env.PORT || 10000;
  const base = (process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || `http://localhost:${PORT}`).replace(/\/+$/, '');
  const apiPrefix = (process.env.API_PREFIX || '/api/v1').replace(/\/?$/, '');

  const specs = swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: { title: 'Ecommerce Backend API', version: process.env.npm_package_version || '1.0.0' },
      servers: [
        { url: base, description: 'Root' },
        { url: `${base}${apiPrefix}`, description: 'Versioned root' },
      ],
      components: {
        securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
      },
      security: [{ bearerAuth: [] }],
    },
    apis: [
      path.join(__dirname, 'routes/*.js'),
      path.join(__dirname, 'routes/**/*.js'),
    ],
  });

  // 1) Raw spec (verify this opens in browser)
  app.get('/api-docs.json', (_req, res) => res.json(specs));

  // 2) CDN-based UI page (NO local static serving → no collisions)
  app.get(['/api-docs', '/api-docs/'], (_req, res) => {
    res.type('html').send(`<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Ecommerce API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
  <style>.swagger-ui .topbar{display:none}</style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
  <script>
    window.ui = SwaggerUIBundle({
      url: '/api-docs.json',
      dom_id: '#swagger-ui',
      deepLinking: true,
      persistAuthorization: true
    });
  </script>
</body>
</html>`);
  });
};

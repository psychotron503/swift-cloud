'use strict';

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./api-docs/swagger.json');
const catalogRouter = require('./routes/catalog');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use(express.urlencoded({
  extended: false
}));

app.use('/catalog', catalogRouter);

const server = app.listen(5000, () => {
  console.log(`Server started on port ${server.address().port}`);
});

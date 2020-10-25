'use strict';

const express = require('express');
const process = require('process'); 
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./api-docs/swagger.json');
const catalogRouter = require('./routes/catalog');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use(express.urlencoded({
  extended: false
}));

app.use('/catalog', catalogRouter);

const PORT = process.env.port || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${server.address().port}`);
});

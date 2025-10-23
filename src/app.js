const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
//const xss = require("xss-clean");
const rateLimit = require('express-rate-limit');
const pessoaRoutes = require('./routes/pessoa.routes');
const errorHandler = require('./middlewares/error.middleware');
const health = require('./middlewares/health.middleware');
const config = require('./config');
const logger = require('./utils/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
//app.use(xss());

app.use(
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
  })
);
app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url }, 'Requisicao recebida');
  next();
});

app.get('/health', health);

app.use('/pessoas', pessoaRoutes);

// docs swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

module.exports = app;

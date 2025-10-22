const express = require("express");
const cors = require("cors");
const pessoaRoutes = require("./routes/pessoa.routes");
const errorHandler = require("./middlewares/error.middleware");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


const app = express();
app.use(cors());
app.use(express.json());

app.use("/pessoas", pessoaRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

module.exports = app;

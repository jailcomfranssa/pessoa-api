const express = require("express");
const cors = require("cors");
const pessoaRoutes = require("./routes/pessoa.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/pessoas", pessoaRoutes);
app.use(errorHandler);

module.exports = app;

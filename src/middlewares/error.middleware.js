const { error } = require("../utils/response");

module.exports = (err, req, res, next) => {
    const status = err.status || 500;
    error(res, err.message || "Erro interno do servidor", status, err.detalhes);
};

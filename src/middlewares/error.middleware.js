const { error } = require("../utils/response");
const { tratarErroPrisma } = require("../utils/prisma-error");

module.exports = (err, req, res, next) => {
    console.error("[ERROR]", err);

    // Erro do Prisma
    if (err && err.code && err.code.startsWith("P")) {
        const tratado = tratarErroPrisma(err);
        return error(res, tratado.message, tratado.status);
    }

    // Erro de validação (Joi)
    if (err && err.isJoi) {
        return error(
            res,
            err.message || "Erro de validação",
            err.status || 400
        );
    }

    // Erro já estruturado (lançado manualmente)
    if (err && err.status && err.message) {
        return error(res, err.message, err.status);
    }

    // Erro desconhecido
    return error(res, "Erro interno do servidor", 500, err && err.message);
};

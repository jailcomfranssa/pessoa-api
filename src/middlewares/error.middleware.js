const { error } = require("../utils/response");
const { tratarErroPrisma } = require("../utils/prisma-error");

module.exports = (err, req, res, next) => {
    const tratado = tratarErroPrisma(err);
    error(res, tratado.message, tratado.status);
};

const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return next({ status: 401, message: "Token não fornecido" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2)
        return next({ status: 401, message: "Token inválido" });

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme))
        return next({ status: 401, message: "Token mal formatado" });

    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        req.user = decoded;
        return next();
    } catch (err) {
        return next({ status: 401, message: "Token inválido ou expirado" });
    }
};

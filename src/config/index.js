const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

module.exports = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    jwt: {
        secret: process.env.JWT_SECRET || "troque_por_uma_variavel_de_ambiente",
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
    rateLimit: {
        windowMs: parseInt(process.env.RATE_WINDOW_MS || "60000"), // 1 minuto
        max: parseInt(process.env.RATE_MAX || "100"),
    },
};

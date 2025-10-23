// health.middleware.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  try {
    // Verificar conexão com BD
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      ok: true,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (error) {
    res.status(503).json({
      ok: false,
      uptime: process.uptime(),
      database: 'disconnected',
      error: error.message,
    });
  }
};

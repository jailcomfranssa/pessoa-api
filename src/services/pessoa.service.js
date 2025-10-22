const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listar = () => prisma.pessoa.findMany();
exports.buscarPorId = id => prisma.pessoa.findUnique({ where: { id } });
exports.criar = data => prisma.pessoa.create({ data });
exports.atualizar = (id, data) => prisma.pessoa.update({ where: { id }, data });
exports.remover = id => prisma.pessoa.delete({ where: { id } });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listar = async ({ nome, idade, sexo, page = 1, limit = 10 }) => {
  try {
    const where = {};
    if (nome) where.nome = { contains: nome, mode: 'insensitive' };
    if (idade !== undefined) where.idade = idade;
    if (sexo) where.sexo = sexo;

    const take = Math.min(parseInt(limit, 10) || 10, 100);
    const skip = (Math.max(parseInt(page, 10) || 1, 1) - 1) * take;

    return await prisma.pessoa.findMany({ where, take, skip });
  } catch (error) {
    throw error;
  }
};

exports.buscarPorId = (id) => prisma.pessoa.findUnique({ where: { id } });

exports.buscarPorNomeEIdade = (nome, idade) => {
  return prisma.pessoa.findFirst({ where: { nome, idade } });
};

exports.criar = (data) => prisma.pessoa.create({ data });
exports.atualizar = (id, data) => prisma.pessoa.update({ where: { id }, data });
exports.remover = (id) => prisma.pessoa.delete({ where: { id } });

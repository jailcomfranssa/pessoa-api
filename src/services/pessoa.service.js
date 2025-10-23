const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listar = (filtros) => {
    const where = {};
    if (filtros.nome)
        where.nome = { contains: filtros.nome, mode: "insensitive" };
    if (filtros.idade !== undefined) where.idade = filtros.idade;
    if (filtros.sexo) where.sexo = filtros.sexo;
    return prisma.pessoa.findMany({ where });
};

exports.buscarPorId = (id) => prisma.pessoa.findUnique({ where: { id } });

exports.buscarPorNomeEIdade = (nome, idade) => {
    return prisma.pessoa.findFirst({ where: { nome, idade } });
};

exports.criar = (data) => prisma.pessoa.create({ data });
exports.atualizar = (id, data) => prisma.pessoa.update({ where: { id }, data });
exports.remover = (id) => prisma.pessoa.delete({ where: { id } });

const { Prisma } = require("@prisma/client");

function tratarErroPrisma(err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
            return { status: 404, message: "Registro não encontrado" };
        }
        if (err.code === "P2002") {
            return {
                status: 409,
                message:
                    "Violação de unicidade. Já existe um registro com esse valor.",
            };
        }
    }
    return { status: 500, message: "Erro interno do servidor" };
}

module.exports = { tratarErroPrisma };

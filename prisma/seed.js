const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.pessoa.createMany({
        data: [
            { nome: "Ana", idade: 28, sexo: "F" },
            { nome: "Carlos", idade: 35, sexo: "M" },
        ],
    });
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());

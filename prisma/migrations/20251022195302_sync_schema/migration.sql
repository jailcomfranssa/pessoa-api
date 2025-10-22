-- CreateTable
CREATE TABLE "Pessoa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "sexo" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

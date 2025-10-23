exports.pessoaToDTO = (p) => ({
    id: p.id,
    nome: p.nome,
    idade: p.idade,
    sexo: p.sexo,
    //criadoEm: p.createdAt || p.criadoEm || null,
});

exports.pessoasToDTO = (lista) => lista.map(exports.pessoaToDTO);

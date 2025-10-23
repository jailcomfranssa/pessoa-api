const service = require("../services/pessoa.service");
const { validarId } = require("../utils/validate");
const response = require("../utils/response");
const { pessoaToDTO, pessoasToDTO } = require("../utils/mapper");

exports.listar = async (req, res, next) => {
    try {
        const filtros = {
            nome: req.query.nome,
            idade: req.query.idade ? parseInt(req.query.idade) : undefined,
            sexo: req.query.sexo,
        };

        const pessoas = await service.listar(filtros);
        const pessoasDTO = pessoasToDTO(pessoas);
        return response.success(res, pessoasDTO, "Pessoas filtradas");
    } catch (err) {
        next(err);
    }
};

exports.buscarPorId = async (req, res, next) => {
    try {
        validarId(req.params.id);
        const pessoa = await service.buscarPorId(+req.params.id);
        if (!pessoa) throw { status: 404, message: "Pessoa não encontrada" };

        const pessoaDTO = pessoaToDTO(pessoa);
        return response.success(res, pessoaDTO, "Pessoa encontrada");
    } catch (err) {
        next(err);
    }
};

exports.criar = async (req, res, next) => {
    try {
        // regra de negocio: impedir duplicatas
        const existe = await service.buscarPorNomeEIdade(
            req.body.nome,
            req.body.idade
        );
        if (existe) throw { status: 409, message: "Pessoa já cadastrada" };

        const nova = await service.criar(req.body);
        const novaDTO = pessoaToDTO(nova);
        return response.success(res, novaDTO, "Pessoa criada", 201);
    } catch (err) {
        next(err);
    }
};

exports.atualizar = async (req, res, next) => {
    try {
        validarId(req.params.id);
        const atualizada = await service.atualizar(+req.params.id, req.body);
        const atualizadaDTO = pessoaToDTO(atualizada);
        return response.success(res, atualizadaDTO, "Pessoa atualizada");
    } catch (err) {
        next(err);
    }
};

exports.remover = async (req, res, next) => {
    try {
        validarId(req.params.id);
        await service.remover(+req.params.id);
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
};

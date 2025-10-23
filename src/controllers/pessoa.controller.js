const service = require("../services/pessoa.service");
const { validarPessoa, validarId } = require("../utils/validate");
const response = require("../utils/response");

exports.listar = async (req, res, next) => {
    try {
        const filtros = {
            nome: req.query.nome,
            idade: req.query.idade ? parseInt(req.query.idade) : undefined,
            sexo: req.query.sexo,
        };
        const pessoas = await service.listar(filtros);
        response.success(res, pessoas, "Pessoas filtradas");
    } catch (err) {
        next(err);
    }
};

exports.buscarPorId = async (req, res, next) => {
    try {
        validarId(req.params.id);
        const pessoa = await service.buscarPorId(+req.params.id);
        if (!pessoa)
            return res.status(404).json({ erro: "Pessoa não encontrada" });
        res.json(pessoa);
    } catch (err) {
        next(err);
    }
};

exports.criar = async (req, res, next) => {
    try {
        validarPessoa(req.body);
        const nova = await service.criar(req.body);
        res.status(201).json(nova);
    } catch (err) {
        next(err);
    }
};

exports.atualizar = async (req, res, next) => {
    try {
        validarPessoa(req.body);
        const atualizada = await service.atualizar(+req.params.id, req.body);
        res.json(atualizada);
    } catch (err) {
        next(err);
    }
};

exports.remover = async (req, res, next) => {
    try {
        await service.remover(+req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

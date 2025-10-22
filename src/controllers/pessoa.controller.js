const service = require("../services/pessoa.service");
const { validarPessoa } = require("../utils/validate");

exports.listar = async (req, res, next) => {
    try {
        const pessoas = await service.listar();
        res.json(pessoas);
    } catch (err) {
        next(err);
    }
};

exports.buscarPorId = async (req, res, next) => {
    try {
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

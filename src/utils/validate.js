const Joi = require("joi");

const schema = Joi.object({
    nome: Joi.string().trim().min(2).max(100).pattern(/^[A-Za-zÀ-ÿ\s]+$/).required(),
    idade: Joi.number().integer().min(0).required(),
    sexo: Joi.string().valid("M", "F", "Outro").insensitive().required()
}).options({ stripUnknown: true });

exports.validarPessoa = (data) => {
    const { error } = schema.validate(data);
    if (error) throw { status: 400, message: error.details[0].message };
};

exports.validarId = (id) => {
    const schema = Joi.number().integer().positive().required();
    const { error } = schema.validate(id);
    if (error)
        throw {
            status: 400,
            message: "ID inválido. Deve ser um número inteiro positivo.",
        };
};

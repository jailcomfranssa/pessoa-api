const Joi = require("joi");

const schema = Joi.object({
    nome: Joi.string().min(2).required(),
    idade: Joi.number().integer().min(0).required(),
    sexo: Joi.string().valid("M", "F", "Outro").required(),
});

exports.validarPessoa = (data) => {
    const { error } = schema.validate(data);
    if (error) throw { status: 400, message: error.details[0].message };
};

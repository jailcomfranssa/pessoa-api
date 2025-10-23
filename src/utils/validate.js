const Joi = require("joi");

const nome = Joi.string()
    .trim()
    .min(2)
    .max(100)
    .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
    .messages({
        "string.empty": "O nome não pode ficar vazio",
        "string.min": "O nome deve ter pelo menos {#limit} caracteres",
        "string.pattern.base": "O nome deve conter apenas letras e espaços",
    });

const idade = Joi.number().integer().min(0).max(120).messages({
    "number.base": "A idade deve ser numérica",
    "number.min": "A idade não pode ser negativa",
});

const sexo = Joi.string().valid("M", "F", "Outro").insensitive().messages({
    "any.only": "Sexo deve ser 'M', 'F' ou 'Outro'",
});

const baseSchema = {
    nome,
    idade,
    sexo,
};

exports.schemaCriar = Joi.object({
    nome: nome.required(),
    idade: idade.required(),
    sexo: sexo.required(),
}).options({ stripUnknown: true, abortEarly: false });

exports.schemaAtualizar = Joi.object(baseSchema)
    .min(1)
    .options({ stripUnknown: true, abortEarly: false });

exports.schemaFiltro = Joi.object({
    nome: Joi.string().trim().min(2).max(100),
    idade: Joi.number().integer().min(0),
    sexo: Joi.string().valid("M", "F", "Outro").insensitive(),
}).options({ allowUnknown: false });

exports.validarId = (id) => {
    const { error } = Joi.number().integer().positive().validate(id);
    if (error)
        throw {
            status: 400,
            message: "ID inválido. Deve ser um número inteiro positivo.",
        };
};

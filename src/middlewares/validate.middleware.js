// middlewares/validate.middleware.js
module.exports = {
    validarBody: (schema) => async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err) {
            // err é um Joi.ValidationError
            return next({
                status: 400,
                message: err.details.map((d) => d.message).join("; "),
                isJoi: true,
            });
        }
    },

    validarQuery: (schema) => async (req, res, next) => {
        try {
            await schema.validateAsync(req.query, { abortEarly: false });
            next();
        } catch (err) {
            return next({
                status: 400,
                message: err.details.map((d) => d.message).join("; "),
                isJoi: true,
            });
        }
    },
};

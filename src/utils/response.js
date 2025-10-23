exports.success = (
    res,
    data,
    message = "Operação realizada com sucesso",
    status = 200
) => {
    return res.status(status).json({
        sucesso: true,
        mensagem: message,
        dados: data,
    });
};

exports.error = (
    res,
    message = "Erro interno do servidor",
    status = 500,
    detalhes = null
) => {
    return res.status(status).json({
        sucesso: false,
        mensagem: message,
        ...(detalhes && { detalhes }),
    });
};

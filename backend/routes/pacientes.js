const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const pacientesExemplo = [
            { id: 1, nome: "Paciente Exemplo", cpf: "000.000.000-00", data_nascimento: "01/01/1990", telefone: "(00) 00000-0000", endereco: "Rua Exemplo, 123" }
        ];
        res.json(pacientesExemplo);
    } catch (erro) {
        console.error("Erro ao buscar pacientes:", erro);
        res.status(500).json({ erro: "Erro interno ao buscar pacientes." });
    }
});

module.exports = router;
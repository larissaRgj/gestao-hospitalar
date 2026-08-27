const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const medicosExemplo = [
            { id: 1, nome: "Dr. Exemplo", especialidade: "Cardiologia", crm: "123456", telefone: "(11) 99999-9999" }
        ];
        res.json(medicosExemplo);
    } catch (erro) {
        console.error("Erro ao buscar médicos:", erro);
        res.status(500).json({ erro: "Erro interno ao buscar médicos." });
    }
});

module.exports = router;
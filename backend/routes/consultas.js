const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const consultasExemplo = [
            { id: 1, paciente_nome: "Paciente Exemplo", medico_nome: "Dr. Exemplo", data: "2026-08-27", horario: "14:00", status: "Confirmada", observacoes: "Nenhuma" }
        ];
        res.json(consultasExemplo);
    } catch (erro) {
        console.error("Erro ao buscar consultas:", erro);
        res.status(500).json({ erro: "Erro interno ao buscar consultas." });
    }
});

module.exports = router;
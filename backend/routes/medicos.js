const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar médicos
router.get('/', (req, res) => {
    db.all("SELECT * FROM medicos", [], (err, rows) => {
        if (err) {
            console.error("Erro ao buscar médicos:", err);
            return res.status(500).json({ erro: "Erro ao buscar médicos." });
        }
        res.json(rows);
    });
});

// Cadastrar médico
router.post('/', (req, res) => {
    const { nome, crm, especialidade, telefone } = req.body;

    if (!nome) {
        return res.status(400).json({ erro: "O nome do médico é obrigatório." });
    }

    const query = `INSERT INTO medicos (nome, crm, especialidade, telefone) VALUES (?, ?, ?, ?)`;
    db.run(query, [nome, crm, especialidade, telefone], function(err) {
        if (err) {
            console.error("Erro ao cadastrar médico:", err);
            return res.status(500).json({ erro: "Erro ao cadastrar médico no banco de dados." });
        }
        res.status(201).json({ id: this.lastID, mensagem: "Médico cadastrado com sucesso!" });
    });
});

module.exports = router;
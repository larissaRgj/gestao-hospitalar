const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar pacientes
router.get('/', (req, res) => {
    db.all("SELECT * FROM pacientes", [], (err, rows) => {
        if (err) {
            console.error("Erro ao buscar pacientes:", err);
            return res.status(500).json({ erro: "Erro ao buscar pacientes." });
        }
        res.json(rows);
    });
});

// Cadastrar paciente
router.post('/', (req, res) => {
    const { nome, cpf, data_nascimento, telefone, endereco } = req.body;
    
    if (!nome) {
        return res.status(400).json({ erro: "O nome do paciente é obrigatório." });
    }

    const query = `INSERT INTO pacientes (nome, cpf, data_nascimento, telefone, endereco) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [nome, cpf, data_nascimento, telefone, endereco], function(err) {
        if (err) {
            console.error("Erro ao cadastrar paciente:", err);
            return res.status(500).json({ erro: "Erro ao cadastrar paciente no banco de dados." });
        }
        res.status(201).json({ id: this.lastID, mensagem: "Paciente cadastrado com sucesso!" });
    });
});

module.exports = router;
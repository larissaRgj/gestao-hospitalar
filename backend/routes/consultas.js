const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar consultas
router.get('/', (req, res) => {
    const query = `
        SELECT consultas.*, pacientes.nome as paciente_nome, medicos.nome as medico_nome 
        FROM consultas 
        LEFT JOIN pacientes ON consultas.paciente_id = pacientes.id 
        LEFT JOIN medicos ON consultas.medico_id = medicos.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Erro ao buscar consultas:", err);
            return res.status(500).json({ erro: "Erro ao buscar consultas." });
        }
        res.json(rows);
    });
});

// Cadastrar consulta
router.post('/', (req, res) => {
    const { paciente_id, medico_id, data, horario, status, observacoes } = req.body;

    if (!paciente_id || !medico_id) {
        return res.status(400).json({ erro: "Paciente e Médico são obrigatórios para agendar." });
    }

    const query = `INSERT INTO consultas (paciente_id, medico_id, data, horario, status, observacoes) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [paciente_id, medico_id, data, horario, status || 'Agendada', observacoes], function(err) {
        if (err) {
            console.error("Erro ao agendar consulta:", err);
            return res.status(500).json({ erro: "Erro ao agendar consulta no banco de dados." });
        }
        res.status(201).json({ id: this.lastID, mensagem: "Consulta agendada com sucesso!" });
    });
});

module.exports = router;
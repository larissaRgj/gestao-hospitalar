const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite com sucesso em:', dbPath);
    }
});

function criarTabelas() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS pacientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf TEXT,
            data_nascimento TEXT,
            telefone TEXT,
            endereco TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS medicos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            crm TEXT,
            especialidade TEXT,
            telefone TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS consultas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            paciente_id INTEGER,
            medico_id INTEGER,
            data TEXT,
            horario TEXT,
            status TEXT,
            observacoes TEXT
        )`);
    });
}

module.exports = db;
module.exports.db = db;
module.exports.criarTabelas = criarTabelas;
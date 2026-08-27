const Database = require('better-sqlite3');
const path = require('path');

// Caminho absoluto para o banco de dados
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new Database(dbPath);

console.log('Conectado ao banco de dados SQLite com sucesso em:', dbPath);

function criarTabelas() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS pacientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf TEXT,
            data_nascimento TEXT,
            telefone TEXT,
            endereco TEXT
        );

        CREATE TABLE IF NOT EXISTS medicos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            crm TEXT,
            especialidade TEXT,
            telefone TEXT
        );

        CREATE TABLE IF NOT EXISTS consultas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            paciente_id INTEGER,
            medico_id INTEGER,
            data TEXT,
            horario TEXT,
            status TEXT,
            observacoes TEXT
        );
    `);
}

// Cria uma interface compatível para o padrão antigo (db.all, db.run, db.get)
const dbCompat = {
    all: (sql, params, callback) => {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        try {
            const stmt = db.prepare(sql);
            const rows = stmt.all(params);
            callback(null, rows);
        } catch (err) {
            callback(err);
        }
    },
    run: function(sql, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        try {
            const stmt = db.prepare(sql);
            const info = stmt.run(params);
            const context = { lastID: info.lastInsertRowid, changes: info.changes };
            if (callback) callback.call(context, null);
        } catch (err) {
            if (callback) callback(err);
        }
    },
    get: (sql, params, callback) => {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        try {
            const stmt = db.prepare(sql);
            const row = stmt.get(params);
            callback(null, row);
        } catch (err) {
            callback(err);
        }
    },
    serialize: (cb) => cb()
};

module.exports = dbCompat;
module.exports.db = dbCompat;
module.exports.criarTabelas = criarTabelas;
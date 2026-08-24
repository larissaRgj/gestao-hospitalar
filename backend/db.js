// db.js
// Responsável por abrir (ou criar) o arquivo de banco de dados SQLite
// e garantir que as tabelas do sistema existam.

const path = require("path");
const Database = require("better-sqlite3");

const DB_PATH = path.join(__dirname, "data", "banco_hospitalar.db");

const db = new Database(DB_PATH);

// Ativa chaves estrangeiras (SQLite não valida FKs por padrão)
db.pragma("foreign_keys = ON");

/**
 * Cria as tabelas pacientes, medicos e consultas caso ainda não existam.
 * Equivalente ao botão "Criar Banco de Dados" da versão Android.
 */
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
      paciente_id INTEGER NOT NULL,
      medico_id INTEGER NOT NULL,
      data TEXT,
      horario TEXT,
      status TEXT,
      observacoes TEXT,
      FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
      FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE
    );
  `);
}

// Garante que as tabelas existem assim que o servidor sobe
criarTabelas();

module.exports = { db, criarTabelas };

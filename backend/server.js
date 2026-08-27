// server.js
// Servidor Express que expõe a API REST do sistema de Gestão Hospitalar.

const express = require("express");
const cors = require("cors");

const { criarTabelas } = require("./db");
const pacientesRouter = require("./routes/pacientes");
const medicosRouter = require("./routes/medicos");
const consultasRouter = require("./routes/consultas");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Rota de teste rápida
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mensagem: "API Gestão Hospitalar no ar." });
});

// Recria/garante as tabelas sob demanda (equivalente ao botão "Criar Banco de Dados")
app.post("/api/criar-banco", (req, res) => {
  try {
    criarTabelas();
    res.json({ mensagem: "Banco de dados pronto! Tabelas: pacientes, medicos, consultas." });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.use("/api/pacientes", pacientesRouter);
app.use("/api/medicos", medicosRouter);
app.use("/api/consultas", consultasRouter);

app.listen(PORT, () => {
  console.log(`API Gestão Hospitalar rodando na porta ${PORT}`);
});
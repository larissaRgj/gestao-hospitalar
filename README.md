# Gestão Hospitalar — React + Node.js/Express + SQLite

Sistema web de cadastro e consulta de **Pacientes**, **Médicos** e **Consultas**, com
navegação de registros (Primeiro / Anterior / Próximo / Último), pensado para rodar
localmente no VSCode.

## Arquitetura

```
gestao-hospitalar-web/
├── backend/          API REST (Node.js + Express + better-sqlite3)
│   ├── data/          arquivo banco_hospitalar.db é criado aqui
│   ├── routes/         pacientes.js, medicos.js, consultas.js (CRUD completo)
│   ├── db.js           conexão SQLite + criação das tabelas
│   └── server.js       ponto de entrada da API (porta 3001)
└── frontend/         Aplicação React (Vite)
    └── src/
        ├── api.js              cliente HTTP para a API
        ├── components/         Sidebar e NavegacaoRegistros (reutilizável)
        └── pages/               Painel, Pacientes, Medicos, Consultas
```

O frontend nunca acessa o SQLite diretamente — ele conversa por HTTP (`fetch`) com a
API Express, que é quem lê e grava no arquivo `.db`.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (o projeto foi testado com o Node 22)
- VSCode (ou qualquer editor)

## Como rodar (2 terminais no VSCode)

### 1. Backend (API + banco SQLite)

```bash
cd backend
npm install
npm start
```

Isso sobe a API em `http://localhost:3001` e já cria automaticamente o arquivo
`backend/data/banco_hospitalar.db` com as tabelas `pacientes`, `medicos` e `consultas`
na primeira execução.

Endpoints principais:

| Método | Rota                  | Descrição                          |
|--------|------------------------|--------------------------------------|
| GET    | `/api/health`           | Verifica se a API está no ar         |
| POST   | `/api/criar-banco`      | (Re)garante que as tabelas existem   |
| GET/POST/PUT/DELETE | `/api/pacientes[/:id]` | CRUD de pacientes       |
| GET/POST/PUT/DELETE | `/api/medicos[/:id]`   | CRUD de médicos          |
| GET/POST/PUT/DELETE | `/api/consultas[/:id]` | CRUD de consultas (com JOIN dos nomes de paciente/médico) |

### 2. Frontend (React)

Em um **segundo terminal**:

```bash
cd frontend
npm install
npm run dev
```

Acesse **http://localhost:5173** no navegador. O frontend já está configurado para
chamar a API em `http://localhost:3001` (ver `frontend/src/api.js`).

> Importante: o backend precisa estar rodando **antes** de usar o frontend, senão as
> telas mostrarão erro de conexão.

## Fluxo de uso

1. Abra o **Painel** e clique em "Preparar banco de dados" (opcional — as tabelas já
   são criadas automaticamente ao subir o backend).
2. Cadastre pacientes em **Pacientes**.
3. Cadastre médicos em **Médicos**.
4. Em **Consultas**, selecione paciente e médico já cadastrados, informe data/horário
   e status, e agende.
5. Em qualquer uma das três telas, use os botões **« ‹ › »** para navegar entre os
   registros (Primeiro / Anterior / Próximo / Último) e os botões **Editar** /
   **Excluir** para gerenciar cada registro.

## Build de produção do frontend

```bash
cd frontend
npm run build
```

Gera os arquivos estáticos em `frontend/dist/`, que podem ser servidos por qualquer
servidor HTTP (ou pelo próprio Express, se desejar unificar tudo em um único servidor).

## Trocar para MySQL no futuro

O projeto foi feito com SQLite (`better-sqlite3`) por não exigir servidor de banco
instalado. Se quiser migrar para MySQL depois, o único arquivo que muda de fato é
`backend/db.js` (troca de `better-sqlite3` por `mysql2`) — as rotas em `backend/routes/`
usam apenas `SELECT/INSERT/UPDATE/DELETE` padrão e precisariam de pequenos ajustes de
sintaxe (placeholders `?` já são compatíveis com `mysql2`).

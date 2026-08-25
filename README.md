# 🏥 Gestão Hospitalar

Sistema web completo para gerenciamento hospitalar com funcionalidades de cadastro de pacientes, agendamento de consultas, gerenciamento de médicos e análise de dados.

**[🌐 Visualizar Projeto](https://gestao-hospitalar-delta.vercel.app)**

---

## 📋 Sumário

- [Características](#características)
- [Tech Stack](#tech-stack)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Autor](#autor)

---

## ✨ Características

### 👥 Gerenciamento de Pacientes
- ✅ Cadastro completo de pacientes
- ✅ Histórico médico
- ✅ Dados de contato e endereço
- ✅ Busca e filtros avançados
- ✅ Navegação entre registros (Primeiro/Anterior/Próximo/Último)

### 📅 Agendamento de Consultas
- ✅ Agendar consultas com médicos
- ✅ Visualizar disponibilidade
- ✅ Gerenciar horários
- ✅ Status de consultas
- ✅ Histórico completo de agendamentos

### 👨‍⚕️ Gerenciamento de Médicos
- ✅ Cadastro de médicos
- ✅ Especialidades
- ✅ Horários de atendimento
- ✅ Histórico de consultas
- ✅ Navegação de registros

### 📊 Dashboard Administrativo
- ✅ Estatísticas gerais
- ✅ Relatórios de consultas
- ✅ Visualização de dados em tempo real
- ✅ Gráficos e análises

---

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **SQLite** - Banco de dados relacional
- **better-sqlite3** - Driver SQL performático
- **CORS** - Controle de origem

```json
{
  "runtime": "Node.js",
  "framework": "Express v4.22.2",
  "database": "SQLite3",
  "driver": "better-sqlite3 v11.3.0",
  "language": "JavaScript"
}
```

### Frontend
- **React** - Biblioteca UI
- **React Router** - Roteamento
- **Vite** - Build tool rápido
- **TypeScript** - Type safety

```json
{
  "library": "React v19.2.8",
  "router": "React Router v7.18.2",
  "build": "Vite v8.2.0",
  "language": "JavaScript"
}
```

---

## 🏗 Arquitetura

```
gestao-hospitalar/
├── backend/                 # API REST (Node.js + Express)
│   ├── data/               # Banco de dados SQLite
│   │   └── banco_hospitalar.db
│   ├── routes/             # Definição de rotas
│   │   ├── pacientes.js
│   │   ├── medicos.js
│   │   └── consultas.js
│   ├── db.js               # Conexão e criação de tabelas
│   ├── server.js           # Arquivo principal
│   └── package.json
│
├── frontend/               # Interface (React + Vite)
│   ├── src/
│   │   ├── pages/         # Páginas da aplicação
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Pacientes.jsx
│   │   │   ├── Medicos.jsx
│   │   │   └── Consultas.jsx
│   │   ├── components/    # Componentes reutilizáveis
│   │   │   ├── Sidebar.jsx
│   │   │   └── NavegacaoRegistros.jsx
│   │   ├── api.js         # Cliente HTTP
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

### Fluxo de Dados
```
Frontend (React)
      ↓ HTTP Fetch
      ↓
Backend (Express)
      ↓ SQL Queries
      ↓
SQLite Database
```

---

## 📦 Instalação

### Pré-requisitos
- **Node.js** v18+ ou superior
- **npm** ou **yarn**
- **Git**

### Clone o repositório
```bash
git clone https://github.com/larissaRgj/gestao-hospitalar.git
cd gestao-hospitalar
```

### Setup Backend

```bash
cd backend

# Instale as dependências
npm install

# Inicie o servidor em modo desenvolvimento
npm run dev

# Ou em modo produção
npm start
```

**Backend rodando em**: `http://localhost:3001`

Automaticamente, o arquivo `backend/data/banco_hospitalar.db` será criado com as tabelas necessárias.

### Setup Frontend

Em **outro terminal**:

```bash
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

**Frontend rodando em**: `http://localhost:5173`

---

## 🚀 Como Usar

### Fluxo Recomendado

1. **Inicie o Backend** (Terminal 1)
   ```bash
   cd backend && npm run dev
   ```

2. **Inicie o Frontend** (Terminal 2)
   ```bash
   cd frontend && npm run dev
   ```

3. **Acesse a aplicação**
   - Abra: `http://localhost:5173`

4. **Utilize as funcionalidades**
   - **Painel** - Visualize estatísticas
   - **Pacientes** - Cadastre e gerencie pacientes
   - **Médicos** - Gerencie médicos e especialidades
   - **Consultas** - Agende consultas
   - Use os botões « ‹ › » para navegar entre registros

---

## 📡 API Endpoints

### Health Check
```
GET /api/health               # Verifica se a API está rodando
POST /api/criar-banco         # (Re)garante existência das tabelas
```

### Pacientes
```
GET    /api/pacientes         # Listar todos os pacientes
POST   /api/pacientes         # Criar novo paciente
GET    /api/pacientes/:id     # Obter um paciente específico
PUT    /api/pacientes/:id     # Atualizar paciente
DELETE /api/pacientes/:id     # Deletar paciente
```

### Médicos
```
GET    /api/medicos           # Listar todos os médicos
POST   /api/medicos           # Criar novo médico
GET    /api/medicos/:id       # Obter um médico específico
PUT    /api/medicos/:id       # Atualizar médico
DELETE /api/medicos/:id       # Deletar médico
```

### Consultas
```
GET    /api/consultas         # Listar todas as consultas
POST   /api/consultas         # Agendar nova consulta
GET    /api/consultas/:id     # Obter uma consulta específica
PUT    /api/consultas/:id     # Atualizar consulta
DELETE /api/consultas/:id     # Cancelar consulta
```

### Exemplo de Requisição
```bash
# Criar novo paciente
curl -X POST http://localhost:3001/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "data_nascimento": "1990-05-15",
    "cpf": "123.456.789-00",
    "email": "joao@email.com",
    "telefone": "(11) 98765-4321"
  }'
```

---

## 📁 Estrutura de Dados

### Tabela: Pacientes
```sql
CREATE TABLE pacientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data_nascimento TEXT,
    cpf TEXT UNIQUE,
    email TEXT,
    telefone TEXT,
    endereco TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: Médicos
```sql
CREATE TABLE medicos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    especialidade TEXT,
    crm TEXT UNIQUE,
    email TEXT,
    telefone TEXT,
    horario_inicio TEXT,
    horario_fim TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: Consultas
```sql
CREATE TABLE consultas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    data_consulta TEXT NOT NULL,
    hora_consulta TEXT NOT NULL,
    status TEXT DEFAULT 'agendada',
    descricao TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (medico_id) REFERENCES medicos(id)
);
```

---

## 🎯 Funcionalidades Futuras

- [ ] Autenticação com JWT
- [ ] Sistema de permissões por perfil (Admin, Médico, Recepcionista)
- [ ] Integração com calendário externo
- [ ] Notificações por email/SMS
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Aplicativo mobile
- [ ] Dark mode
- [ ] Agendamento automático
- [ ] Histórico de atendimentos

---

## 🧪 Testes

```bash
# Backend - Quando configurado
cd backend
npm test

# Frontend - Lint
cd frontend
npm run lint
```

---

## 🔄 Migração para MySQL

O projeto foi desenvolvido com SQLite para simplicidade, mas é totalmente portável para MySQL:

1. Edite `backend/db.js`
2. Substitua `better-sqlite3` por `mysql2`
3. Ajuste a sintaxe SQL conforme necessário
4. Atualize strings de conexão em `application.properties` ou arquivo de config

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: "EADDRINUSE: address already in use :::3001"
```bash
# A porta já está em uso. Mude em backend/server.js
const PORT = process.env.PORT || 3002; // Mude para 3002
```

### Erro: "CORS error"
```bash
# Verifique se o backend está rodando
# E se está acessível em http://localhost:3001
```

### Banco de dados não criado
```bash
# Acesse o painel e clique em "Preparar banco de dados"
# Ou reinicie o backend
npm run dev
```

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

**Larissa Rodrigues Guimarães**
- GitHub: [@larissaRgj](https://github.com/larissaRgj)
- LinkedIn: [Larissa Guimarães](https://www.linkedin.com/in/larissa-guimaraes-b30489334)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Como contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 💡 Dicas de Desenvolvimento

- Mantenha o backend e frontend em abas separadas do terminal
- Use ferramentas como Postman ou Insomnia para testar a API
- Verifique o console do navegador para logs do frontend
- Use `npm run dev` para modo de desenvolvimento com hot reload
- Inspecione o banco de dados SQLite com [DB Browser for SQLite](https://sqlitebrowser.org/)

---

## 📊 Deploy

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy o diretório 'dist/' no Vercel
```

### Backend (Heroku, Railway, Render)
```bash
npm install
npm start
```

---

**Desenvolvido com ❤️ e ☕ por Larissa Rodrigues**
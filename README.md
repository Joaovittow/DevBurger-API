# 🍔 DevBurger API

API para gerenciamento de pedidos de hamburgueria com arquitetura moderna.

## 💻 Stack Tecnológica

### 🚀 Core
- **JavaScript** (ES6+)
- **Node.js** v20.9.0(LTS)
- **Express** (Framework web)

### 🛢️ Bancos de Dados
- **PostgreSQL** (Principal)
- **MongoDB** (Complementar)
- **Sequelize** (ORM para PostgreSQL)
- **Mongoose** (ODM para MongoDB)
- **Sequelize-cli** (Ferramentas CLI)

### 🔐 Segurança & Autenticação
- **Bcrypt** (Hash de senhas)
- **JsonWebToken** (Autenticação JWT)
- **Yup** (Validação de schemas)

### 🛠️ Ferramentas de Desenvolvimento
- **Sucrase** (Compilação mais rápida)
- **Yarn** (Gerenciador de pacotes)
- **Nodemon** (Hot reload)
- **Multer** (Upload de arquivos)
- **Docker** (Conteinerização)

### 🎨 Code Quality
- **ESLint** (Linter)
- **Prettier** (Formatação de código)
- **CORS** (Middleware de segurança)

## 🚀 Como Executar

### Pré-requisitos
- Docker
- Node.js v20.9.0(LTS)
- Yarn

### Localmente
```bash
npm install
npm run dev
```
> A API estará disponível em `http://localhost:3001`

## 🔌 Rotas Principais

### Autenticação
```http
POST /auth/register
Content-Type: application/json

{
  "name": "João",
  "email": "joao@exemplo.com",
  "password": "senha123"
}
```

### Produtos
```http
GET /products
Authorization: Bearer <token>
```

## 🏗️ Estrutura do Projeto
```
src/
├── config/         # Configurações de DB
├── models/         # Models do Sequelize/Mongoose
├── controllers/    # Lógica de negócio
├── middlewares/    # Autenticação e validadores
├── services/       # Regras de negócio
├── routes/         # Definição de endpoints
├── uploads/        # Arquivos estáticos
└── app.js          # Configuração central
```

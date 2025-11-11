# 🍔 DevBurger API

API RESTful moderna para gerenciamento completo de uma hamburgueria, desenvolvida com Node.js e Express. Oferece funcionalidades de autenticação, gerenciamento de produtos, categorias, pedidos e integração com Stripe para processamento de pagamentos.

## 📋 Índice

- [Features](#-features)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Como Executar](#-como-executar)
- [Documentação da API](#-documentação-da-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Autenticação](#-autenticação)
- [Códigos de Status](#-códigos-de-status)

## ✨ Features

- 🔐 **Autenticação JWT** - Sistema seguro de autenticação com tokens
- 👥 **Gerenciamento de Usuários** - Registro e login de usuários
- 📂 **Categorias** - CRUD completo para categorias de produtos com upload de imagens
- 🍔 **Produtos** - CRUD completo para produtos com suporte a ofertas e imagens
- 📦 **Pedidos** - Criação e gerenciamento de pedidos com status
- 💳 **Pagamentos** - Integração com Stripe para processamento de pagamentos
- 📸 **Upload de Imagens** - Sistema de upload de imagens para produtos e categorias
- ✅ **Validação de Dados** - Validação robusta com Yup
- 🔒 **Middleware de Autenticação** - Proteção de rotas sensíveis
- 👨‍💼 **Controle de Acesso** - Sistema de permissões para administradores

## 🛠️ Tecnologias

### Core
- **Node.js** v20.9.0 (LTS) - Runtime JavaScript
- **Express** v4.21.2 - Framework web minimalista
- **JavaScript (ES6+)** - Linguagem de programação

### Banco de Dados
- **PostgreSQL** - Banco de dados relacional principal
- **MongoDB** - Banco de dados NoSQL para pedidos
- **Sequelize** v6.37.5 - ORM para PostgreSQL
- **Mongoose** v8.13.0 - ODM para MongoDB
- **Sequelize CLI** - Ferramentas de migração

### Segurança & Autenticação
- **Bcrypt** v5.1.1 - Hash de senhas
- **JsonWebToken** v9.0.2 - Autenticação JWT
- **Yup** v1.5.0 - Validação de schemas
- **CORS** v2.8.5 - Middleware de segurança

### Integrações
- **Stripe** v18.4.0 - Processamento de pagamentos
- **Multer** v1.4.5 - Upload de arquivos

### Desenvolvimento
- **Sucrase** v3.35.0 - Compilação rápida (transpilador)
- **Nodemon** v3.1.7 - Hot reload em desenvolvimento
- **Dotenv** v17.2.1 - Gerenciamento de variáveis de ambiente
- **Biome** v1.9.4 - Linter e formatação de código

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** v20.9.0 ou superior
- **Yarn** ou **npm** (gerenciador de pacotes)
- **PostgreSQL** (banco de dados relacional)
- **MongoDB** (banco de dados NoSQL)
- **Docker** (opcional, para containerização)

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositório>
cd DevBurger-API
```

2. **Instale as dependências**
```bash
yarn install
# ou
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env-example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database PostgreSQL
DB_HOST=localhost
DB_USER=postgres
DB_PASS=postgres
DB_NAME=postgres

# Database MongoDB
MONGO_URL=mongodb://localhost:27017/devburger

# JWT
JWT_SECRET=sua-chave-secreta-super-segura
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_sua-chave-stripe

# Server
PORT=3001
```

4. **Configure os bancos de dados**

**PostgreSQL:**
```bash
# Crie o banco de dados
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres 

# Execute as migrações
npx sequelize-cli db:migrate
```

**MongoDB:**
```bash
# Certifique-se de que o MongoDB está rodando
docker run --name mongodb -p 27017:27017 -d -t mongo 
```

## ⚙️ Configuração

### Banco de Dados PostgreSQL

As configurações do PostgreSQL são definidas via variáveis de ambiente (arquivo `.env`) e lidas em `src/config/database.js`.

### Banco de Dados MongoDB

O MongoDB é usado para armazenar os pedidos. Certifique-se de que o MongoDB está rodando e acessível na URL configurada.

### Migrações

O projeto usa Sequelize CLI para gerenciar migrações. As migrações estão em `src/database/migrations/`:

- `create-users-table.js` - Criação da tabela de usuários
- `create-products-table.js` - Criação da tabela de produtos
- `create-categories-table.js` - Criação da tabela de categorias
- `add-category-id-column.js` - Adiciona relacionamento categoria-produto
- `add-offer-column.js` - Adiciona coluna de oferta nos produtos
- `add-path-column.js` - Adiciona caminho de imagem

## ▶️ Como Executar

### Modo Desenvolvimento
```bash
yarn dev
# ou
npm run dev
```

A API estará disponível em `http://localhost:${PORT}` (definido no `.env`)

### Autenticação

A maioria das rotas requer autenticação via JWT. Inclua o token no header:
```
Authorization: Bearer <seu-token-jwt>
```

---

### 🔐 Autenticação

#### Registrar Usuário
```http
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta (201):**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@example.com",
  "admin": false
}
```

#### Login
```http
POST /session
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta (200):**
```json
{
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "admin": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 📂 Categorias

#### Listar Todas as Categorias
```http
GET /categories
Authorization: Bearer <token>
```

**Resposta (200):**
```json
[
  {
    "id": 1,
    "name": "Hambúrgueres",
    "url": "http://localhost:3001/category-file/nome-arquivo.jpg",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Criar Categoria
```http
POST /categories
Authorization: Bearer <token>
Content-Type: multipart/form-data

name: Hambúrgueres
file: [arquivo de imagem]
```

**Resposta (201):**
```json
{
  "id": 1,
  "name": "Hambúrgueres",
  "url": "http://localhost:3001/category-file/nome-arquivo.jpg",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

#### Atualizar Categoria
```http
PUT /categories/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

name: Sanduíches (opcional)
file: [arquivo de imagem] (opcional)
```

**Resposta (200):**
```json
{
  "id": 1,
  "name": "Sanduíches",
  "url": "http://localhost:3001/category-file/novo-arquivo.jpg",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

#### Deletar Categoria
```http
DELETE /categories/:id
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "message": "Categoria deletada com sucesso"
}
```

---

### 🍔 Produtos

#### Listar Todos os Produtos
```http
GET /products
Authorization: Bearer <token>
```

**Resposta (200):**
```json
[
  {
    "id": 1,
    "name": "X-Burger",
    "price": 15.90,
    "category_id": 1,
    "offer": false,
    "url": "http://localhost:3001/product-file/nome-arquivo.jpg",
    "category": {
      "name": "Hambúrgueres"
    },
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Criar Produto
```http
POST /products
Authorization: Bearer <token>
Content-Type: multipart/form-data

name: X-Burger
price: 15.90
category_id: 1
offer: false
file: [arquivo de imagem]
```

**Resposta (201):**
```json
{
  "id": 1,
  "name": "X-Burger",
  "price": 15.90,
  "category_id": 1,
  "offer": false,
  "url": "http://localhost:3001/product-file/nome-arquivo.jpg",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

#### Atualizar Produto
```http
PUT /products/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

name: X-Burger Especial (opcional)
price: 18.90 (opcional)
file: [arquivo de imagem] (opcional)
```

**Resposta (200):**
```json
{
  "id": 1,
  "name": "X-Burger Especial",
  "price": 18.90,
  "category_id": 1,
  "offer": false,
  "url": "http://localhost:3001/product-file/novo-arquivo.jpg",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

#### Deletar Produto
```http
DELETE /products/:id
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "message": "Produto deletado com sucesso"
}
```

---

### 📦 Pedidos

#### Criar Pedido
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "products": [
    {
      "id": 1,
      "quantity": 2
    },
    {
      "id": 3,
      "quantity": 1
    }
  ]
}
```

**Resposta (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "user": {
    "id": "1",
    "name": "João Silva"
  },
  "products": [
    {
      "id": 1,
      "name": "X-Burger",
      "category": "Hambúrgueres",
      "price": 15.90,
      "url": "http://localhost:3001/product-file/nome-arquivo.jpg",
      "quantity": 2
    },
    {
      "id": 3,
      "name": "Batata Frita",
      "category": "Acompanhamentos",
      "price": 8.50,
      "url": "http://localhost:3001/product-file/batata.jpg",
      "quantity": 1
    }
  ],
  "status": "Pedido Realizado",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Listar Todos os Pedidos
```http
GET /orders
Authorization: Bearer <token>
```

**Resposta (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "user": {
      "id": "1",
      "name": "João Silva"
    },
    "products": [...],
    "status": "Pedido Realizado",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Atualizar Status do Pedido
```http
PUT /orders/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Em Preparação"
}
```

**Nota:** Apenas administradores podem atualizar o status do pedido.

**Resposta (200):**
```json
{
  "message": "Status updated successfully"
}
```

**Status possíveis:**
- `Pedido Realizado`
- `Em Preparação`
- `Saiu para Entrega`
- `Entregue`
- `Cancelado`

---

## 🏗️ Estrutura do Projeto

```
DevBurger-API/
├── src/
│   ├── app/
│   │   ├── controllers/          # Lógica de negócio
│   │   │   ├── CategoryController.js
│   │   │   ├── OrderController.js
│   │   │   ├── ProductController.js
│   │   │   ├── SessionController.js
│   │   │   ├── UserController.js
│   │   │   └── stripe/
│   │   │       └── CreatePaymentIntentController.js
│   │   ├── middlewares/          # Middlewares customizados
│   │   │   └── auth.js           # Middleware de autenticação JWT
│   │   ├── models/               # Models do Sequelize (PostgreSQL)
│   │   │   ├── Category.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   └── schemas/              # Schemas do Mongoose (MongoDB)
│   │       └── Order.js
│   ├── config/                   # Configurações
│   │   ├── auth.js               # Configuração JWT
│   │   ├── database.js           # Configuração PostgreSQL
│   │   └── multer.js             # Configuração upload de arquivos
│   ├── database/                 # Banco de dados
│   │   ├── index.js              # Conexão com bancos
│   │   └── migrations/           # Migrações do Sequelize
│   ├── app.js                    # Configuração do Express
│   ├── routes.js                 # Definição de rotas
│   └── server.js                 # Inicialização do servidor
├── uploads/                      # Diretório de uploads (imagens)
├── .env-example                  # Exemplo de variáveis de ambiente
├── package.json                  # Dependências do projeto
└── README.md                     # Este arquivo
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Após fazer login, você receberá um token que deve ser incluído em todas as requisições protegidas.

### Como usar o token:

1. Faça login na rota `/session`
2. Copie o token retornado na resposta
3. Inclua no header de todas as requisições protegidas:
   ```
   Authorization: Bearer <seu-token>
   ```

### Rotas Protegidas

Todas as rotas, exceto `/users` e `/session`, requerem autenticação.

### Permissões de Administrador

Algumas operações (como atualizar status de pedidos) requerem permissões de administrador. O campo `admin` no modelo de usuário determina essas permissões.

## 📊 Códigos de Status

A API utiliza os seguintes códigos de status HTTP:

- `200` - Sucesso (GET, PUT, DELETE)
- `201` - Criado com sucesso (POST)
- `400` - Erro de validação ou requisição inválida
- `401` - Não autenticado ou sem permissão
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

## 📝 Notas Importantes

- As imagens são armazenadas localmente na pasta `uploads/`
- Produtos e categorias são armazenados no PostgreSQL
- Pedidos são armazenados no MongoDB
- O token JWT expira após o período configurado
- Apenas administradores podem atualizar o status dos pedidos
- Validações são feitas usando Yup antes de processar as requisições

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

**Desenvolvido por [Joaovittow](https://github.com/joaovittow)**

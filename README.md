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

## 🌐 Todas as Rotas

### 🔐 Autenticação
| Método | Rota           | Descrição                     | Body                                                                 |
|--------|----------------|-------------------------------|----------------------------------------------------------------------|
| POST   | `/auth/register` | Registrar novo usuário        | `{"name":"string","email":"string","password":"string"}`            |
| POST   | `/auth/login`    | Login (gera token JWT)        | `{"email":"string","password":"string"}`                            |
| POST   | `/auth/refresh`  | Refresh token                 | `{"token":"string"}`                                               |

### 👥 Usuários
| Método | Rota               | Descrição                     | Headers                          |
|--------|--------------------|-------------------------------|----------------------------------|
| GET    | `/users`           | Listar todos usuários         | `Authorization: Bearer <token>`  |
| GET    | `/users/:id`       | Buscar usuário por ID         | `Authorization: Bearer <token>`  |
| PUT    | `/users/:id`       | Atualizar usuário             | `Authorization: Bearer <token>`  |

### 🍔 Produtos
| Método | Rota               | Descrição                     | Body Example                      |
|--------|--------------------|-------------------------------|-----------------------------------|
| GET    | `/products`        | Listar todos produtos         | -                                 |
| POST   | `/products`        | Criar novo produto (Admin)    | `{"name":"string","price":float,"category":"string"}` |
| PUT    | `/products/:id`    | Atualizar produto             | `{"name":"string","price":float}` |
| DELETE | `/products/:id`    | Deletar produto (Admin)       | -                                 |

### 📦 Pedidos
| Método | Rota               | Descrição                     | Body Example                      |
|--------|--------------------|-------------------------------|-----------------------------------|
| POST   | `/orders`          | Criar novo pedido             | `{"products":[{"id":int,"quantity":int}],"user_id":int}` |
| GET    | `/orders`          | Listar todos pedidos          | `Authorization: Bearer <token>`   |
| GET    | `/orders/:id`      | Buscar pedido por ID          | `Authorization: Bearer <token>`   |
| PUT    | `/orders/:id`      | Atualizar status pedido       | `{"status":"string"}`            |

## 🏗️ Estrutura do Projeto
```
src/
├── config/         # Configurações de DB
├── models/         # Models do Sequelize/Mongoose
├── controllers/    # Lógica de negócio
├── middlewares/    # Autenticação e validadores
├── routes/         # Definição de endpoints
└── app.js          # Configuração central
```

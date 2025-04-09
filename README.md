# 🍔 DevBurger API

API para gerenciamento de pedidos de hamburgueria com arquitetura moderna.

## 💻 Stacks

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


## 🌐 Todas as Rotas

### 🔐 Autenticação
| Método | Rota                          | Descrição                     | Body                                                                 | Headers               |
|--------|-------------------------------|-------------------------------|----------------------------------------------------------------------|-----------------------|
| POST   | `http://localhost:3001/users`    | Registrar novo usuário        | `{"name":"string","email":"string","password":"string"}`            | -                     |
| POST   | `http://localhost:3001/session` | Login (gera token JWT)        | `{"email":"string","password":"string"}`                            | -                     |

### 📂 Categorias
| Método | Rota                     | Descrição                     | Body/FormData                   | Headers                          |
|--------|--------------------------|-------------------------------|---------------------------------|----------------------------------|
| GET    | `http://localhost:3001/categories`            | Listar todas categorias       | -                               | `Authorization: Bearer <token>`  |
| POST   | `http://localhost:3001/categories`            | Criar nova categoria          | `name`: string<br>`file`: image | `Authorization: Bearer <token>`<br>`Content-Type: multipart/form-data` |
| PUT    | `http://localhost:3001/categories/:id`        | Atualizar categoria           | `name`: string<br>`file`: image (opcional) | `Authorization: Bearer <token>`<br>`Content-Type: multipart/form-data` |

### 🍔 Produtos
| Método | Rota                     | Descrição                     | Body/FormData                   | Headers                          |
|--------|--------------------------|-------------------------------|---------------------------------|----------------------------------|
| GET    | `http://localhost:3001/products`              | Listar todos produtos         | -                               | `Authorization: Bearer <token>`  |
| POST   | `http://localhost:3001/products`              | Criar novo produto            | `name`: string<br>`price`: number<br>`category_id`: number<br>`file`: image<br>`offer`: boolean | `Authorization: Bearer <token>`<br>`Content-Type: multipart/form-data` |
| PUT    | `http://localhost:3001/products/:id`          | Atualizar produto             | `name`: string<br>`price`: number<br>`file`: image (opcional) | `Authorization: Bearer <token>`<br>`Content-Type: multipart/form-data` |

### 📦 Pedidos
| Método | Rota                     | Descrição                     | Body                                             | Headers                          |
|--------|--------------------------|-------------------------------|--------------------------------------------------|----------------------------------|
| POST   | `http://localhost:3001/orders`                | Criar novo pedido             | `{"products":[{"id":int,"quantity":int}],"user_id":int}` | `Authorization: Bearer <token>`  |
| GET    | `http://localhost:3001/orders`                | Listar todos pedidos          | -                                                | `Authorization: Bearer <token>`  |
| PUT    | `http://localhost:3001/orders/:id`            | Atualizar status pedido       | `{"status":"string"}`                            | `Authorization: Bearer <token>`  |

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

# 🍔 DevBurger API

API para gerenciamento de pedidos de hamburgueria desenvolvida com Node.js + Express.

## 🚀 Começando

### Pré-requisitos
- Node.js (versão LTS)
- npm ou yarn

### Instalação
1. Clone o repositório:
```bash
git clone https://github.com/Joaovittow/DevBurger-API.git
cd DevBurger-API
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

> A API estará disponível em `http://localhost:3001`

## 🔌 Rotas da API

### Autenticação
#### `POST /auth/register`
Registra um novo usuário:
```json
{
  "name": "Nome do usuário",
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

#### `POST /auth/login`
Gera token JWT:
```json
{
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

### Produtos
#### `GET /products`
Lista todos os produtos

#### `POST /products` (Admin)
Cria novo produto:
```json
{
  "name": "Hambúrguer",
  "price": 20.99,
  "category": "lanche"
}
```

### Pedidos
#### `POST /orders`
Cria novo pedido:
```json
{
  "products": [
    {
      "id": 1,
      "quantity": 2
    }
  ],
  "user_id": 1
}
```

## 🏗️ Estrutura
```
src/
├── controllers/    # Lógica dos controllers
├── middlewares/    # Middlewares (JWT)
├── routes/         # Definição de rotas
├── app.js          # Configuração do Express
└── server.js       # Ponto de entrada
```

## 📜 Licença
MIT © [João Vítto](https://github.com/Joaovittow)

> Dúvidas? Abra uma [issue](https://github.com/Joaovittow/DevBurger-API/issues)!

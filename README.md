# API de Carros

Uma API RESTful simples para gerenciar informações de carros, desenvolvida com Node.js, Express e TypeScript. 
Este projeto foi criado com o objetivo de demonstrar a implementação de conceitos como **inversão de controle (IoC)**, **padrão de repositório**, **DTOs (Data Transfer Objects)**, e **tratamento de erros** com middlewares.

## 🚀 Tecnologias

* **Node.js**: Ambiente de execução.
* **Express**: Framework web para Node.js.
* **TypeScript**: Linguagem para tipagem estática e segurança.
* **express-validator**: Middleware para validação de dados em requisições.
* **Postman**: Ferramenta de teste para os endpoints da API.

## 📦 Estrutura do Projeto

A aplicação segue a seguinte organização:

├── src/
│   ├── api/
│   │   ├── controllers/
│   │   │   ├── CarrosController.ts         # Lógica de negócio da API
│   │   ├── Exceptions/
│   │   │   ├── CustomError.ts              # Classe base de erros
│   │   │   ├── NotFoundException.ts        # Erro 404
│   │   │   └── UnauthorizedException.ts    # Erro 401
│   │   ├── middlewares/
│   │   │   ├── basicAuthMiddleware.ts      # Autenticação (Basic Auth)
│   │   │   └── errorhandler.ts             # Tratamento global de erros
│   │   └── routes.ts                       # Gerenciamento de rotas
│   ├── infra/
│   │   ├── CarroRepositorio.ts             # Lógica de acesso aos dados
│   │   ├── fakeBD.json                     # Banco de dados "fake"
│   │   ├── CarroSchema.ts                  # Schema de dados
│   │   └── DBSchema.ts                     # Schema do banco de dados
│   ├── main.ts                             # Arquivo principal da aplicação
│   └── Carro.ts                            # Classe de domínio (entidade)
├── .gitignore                              # Arquivos a serem ignorados pelo Git
├── package.json                            # Dependências e scripts
├── tsconfig.json                           # Configurações do TypeScript
└── README.md                               # Este arquivo

## 🛠️ Como Instalar e Rodar

Para iniciar a aplicação, siga os passos abaixo:

1.  **Clone o repositório:**
    ```sh
    git clone [URL_DO_SEU_REPOSITORIO]
    cd [pasta-do-seu-projeto]
    ```

2.  **Instale as dependências:**
    ```sh
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```sh
    npm start
    ```
    O servidor será iniciado na porta **3000** (`http://localhost:3000`).

## 🛡️ Autenticação

Todos os endpoints da API são protegidos por **Basic Auth**. Use as seguintes credenciais no seu cliente HTTP (ex: Postman):

* **Username:** `carro`
* **Password:** `carro123`

## 📋 Endpoints da API

Aqui estão os principais endpoints disponíveis para interagir com a API.

### **Listar todos os carros ou buscar por modelo**

* `GET /api/carros`
* **Descrição:** Retorna uma lista de todos os carros.
* **Parâmetros de consulta (opcional):**
    * `?modelo=[nome_do_modelo]` - Filtra os carros que contêm o nome do modelo especificado.

### **Buscar carro por ID**

* `GET /api/carros/:id`
* **Descrição:** Retorna os detalhes de um carro específico.

### **Criar um novo carro**

* `POST /api/carros`
* **Descrição:** Cria um novo carro.
* **Corpo da Requisição (JSON):**
    ```json
    {
      "marca": "Chevrolet",
      "modelo": "Onix",
      "ano": 2023,
      "cor": "Vermelho",
      "placa": "ABC-1234",
      "observacoes": "Carro para uso urbano"
    }
    ```

### **Atualizar um carro**

* `PATCH /api/carros/:id`
* **Descrição:** Atualiza parcialmente um carro.
* **Corpo da Requisição (JSON):**
    ```json
    {
      "cor": "Azul"
    }
    ```

### **Deletar um carro**

* `DELETE /api/carros/:id`
* **Descrição:** Deleta um carro pelo ID. Retorna status `204 No Content` se a exclusão for bem-sucedida.

## 📝 Licença

Este projeto está licenciado sob a Licença MIT.
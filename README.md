# Gerenciador de Pedidos

API para gerenciamento de pedidos

## Configurações para execução do servidor:

> Necessário instalação do [NodeJS](https://nodejs.org/en/download/)

> Necessário instalação do [Postman](https://www.postman.com/downloads/)

Necessário instalação do [Mysql Server](https://dev.mysql.com/downloads/mysql/) e então:

- Criar uma instância do **mysql** apontando para **localhost:3306**, com _usuário_: **root** e _senha_: **admin**;
- dentro desta instância, criar schemas **gerenciamento-pedidos** e **gerenciamento-pedidos-tests**;

  No terminal, dentro do diretório do projeto, executar:

  - `npm install --global yarn`
  - `yarn install`
    ou
  - `npm install`

### Testes Integrados e Unitários:

- As rotas de cliente e produto serão testadas através de testes de integração;
- O método que gera o html para o email e o relatório será testado através de um teste unitário;
- Caso esteja utilizando linux, alterar os scripts de test no package.json para:
  - `"pretest": "export NODE_ENV=test&& node tests/utils/clearDB.js"`,
  - `"test": "export NODE_ENV=test&& node tests/utils/initDB.js && jest --forceExit -i"`
- Para executar os testes, execute no terminal, dentro do diretório do projeto:
  - `yarn test`
    ou
  - `npm test`

### Demais Testes de Rotas:

- As demais rotas serão testadas através do Postman;
- Ao abrir Postman, importar o arquivo que se encontra na pasta postman dentro do projeto;
- No terminal, dentro do diretório do projeto, executar:
  ` yarn start`
  ou
  `npm start`
- Ao iniciar o servidor, as tabelas devem ser criadas automáticamente, permitindo que sejam realizados os testes pelo postman
- Alterar o e-mail do cliente para um e-mail válido que receba o e-mail que será gerado e possa ser verificado;
- Enviar as requisições na ordem apresentada, iniciando pela pasta Pedido;
- Para melhor visualização, inserir a rota de relatório em um navegador;

# NodeJS Backend Template

Autor: Wallisson Rony de M. N.

Este é um repositório que contém arquivos que eu normalmente utilizo para construção de backends com NodeJS, Knex e Typescript. Esse também foi configurado como um template e disponibilizado como público. Utilize o quanto quiser :D.

## Pacotes Presentes neste Repositório.

 - ts-node
 - ts-node-dev
 - express
 - cors
 - crypto
 - dotenv-safe
 - knex *
 - pg *
 - jsonwebtoken
 - typescript

*: pacotes que têm um * na frente indicam versionamento específico por causarem problemas em versões mais recentes ou informações mais detalhadas a serem explicadas a seguir.

pg *: após pesquisas, descobri que existe um erro com o pacote pg (postgresql) na versão mais atual até então (10/10/2020) na utilização do SSL. Como utilizo ferramentas de teste como o heroku, que necessita de SSL para conexão com banco de dados, resolvi instalar uma versão mais estável do pg para funcionamento do backend. Por isso, ao utilizar operações com o pg no seu projeto, você poderá ver mensagens que depreciação na utilização do SSL, porém, isso não impacta no desenvolvimento e na experiência de utilização do seu backend ou banco de dados.

knex *: por padrão, nesse projeto, foi inserida a configuração de client do knex para utilizar PostgreSQL. Então, basta inserir as credenciais apresentadas no arquivo 'knexfile.ts' em um arquivo .env.

## Scripts Prontos:

 - 'start': o script start deverá ser utilizado quando o projeto estiver em produção, assim, será utilizado o pacote ts-node para execução dos arquivos Typescript.

 - 'dev': deverá ser utilizado quando o projeto estiver em desenvolvimento. Isso fará com que o pacote ts-node-dev seja executado ao invés do ts-node, deixando a experiência de testes mais tranquila através da constante insistência em deixar o servidor online, "respawnando" a instância da aplicação serve que ouver alguma alteração e também ignorando arquivos desnecessários de verificação, como a pasta node_modules.

 - 'knex:migrate': deverá ser utilizado quando há uma nova atualização a ser realizada no banco de dados.

 - 'knex:migrate:rollback': deverá ser utilizado quando for necessário desfazer uma atualização realizada no banco de dados.

 - 'knex:seed': deverá ser executado quando for necessário inserir 'seeds' (dados básicos) ao banco de dados, como, por exemplo, uma lista de produtos que já estarão cadastrados para primeiro funcionamento.
# Fórum Simples - Backend

Autor: Wallisson Rony de M. N.

Este é um repositório voltado à construção de um fórum simples. Nesse está o backend do projeto.
Junto dos arquivos do projeto há um arquivo .json que pode ser importado no software Insomnia para adição de um workspace com todas as rotas da aplicação.

## Estrutura

A estrutura do projeto se baseia em um simples fórum que terá usuários com somente nomes de usuário e seus nomes (name e username) que poderão publicar postagens com título e conteúdo e poder também gostar e desgostar (like e unlike) cada postagem, não contendo nenhuma restrição ou filtro de visualização de postagens. Logo, a estrutura de cada objeto se baseia nas seguintes tabelas:

Usuário: objeto para armazenar informações necessárias do usuário.

| Atributo   | Tipo     | Descrição                                                                                                                            |
|------------|----------|--------------------------------------------------------------------------------------------------------------------------------------|
| id         | integer  | Número identificador do usuário.                                                                                                     |
| username   | string   | Nome de usuário. Único atributo necessário para entrar, postar e reagir à postagens. Esse não ficará disponível aos outros usuários. |
| name       | string   | Nome do usuário. Esse nome ficará disponível aos outros usuários.                                                                    |

Postagem: objeto para armazenar informações sobre as postagens do fórum.

| Atributo   | Tipo     | Descrição                                          |
|------------|----------|----------------------------------------------------|
| id         | integer  | Número identificador da postagem.                  |
| user_id    | integer  | Número identificador do usuário dono da postagem.  |
| title      | string   | Título da postagem.                                |
| content    | text     | Conteúdo da postagem.                              |
| likes      | integer  | Quantidade de likes da postagem.                   |
| unlikes    | integer  | Quantidade de unlikes da postagem.                 |

Like da postagem: objeto para identificar qual usuário reagiu à postagem.

| Atributo   | Tipo     | Descrição                                              |
|------------|----------|--------------------------------------------------------|
| post_id    | integer  | Número identificador da postagem.                      |
| user_id    | integer  | Número identificador do usuário que reagiu à postagem. |
| liked      | boolean  | Reação à postagem.                                     |

## User Stories

A construção do projeto foi realizada considerando as seguintes histórias de usuário:

<ul>
 <li>O usuário tem que entrar no fórum;</li>
 <li>O usuário tem que poder adicionar postagens com título e conteúdo;</li>
 <li>O usuário pode reagir às postagens do fórum;</li>
 <li>O usuário pode editar suas informações;</li>
 <li>O usuário pode editar as informações das postagens adicionadas por ele.</li>
</ul>

## Pacotes Presentes neste Repositório.

 - ts-node
 - ts-node-dev
 - express
 - cors
 - dotenv-safe
 - knex *
 - pg *
 - typescript

*: pacotes que têm um * na frente indicam versionamento específico por causarem problemas em versões mais recentes ou informações mais detalhadas a serem explicadas a seguir.

pg *: após pesquisas, descobri que existe um erro com o pacote pg (postgresql) na versão mais atual até então (10/10/2020) na utilização do SSL. Como utilizo ferramentas de teste como o heroku, que necessita de SSL para conexão com banco de dados, resolvi instalar uma versão mais estável do pg para funcionamento do backend. Por isso, ao utilizar operações com o pg no seu projeto, você poderá ver mensagens de depreciação na utilização do SSL, porém, isso não impacta no desenvolvimento e na experiência de utilização no seu backend ou banco de dados.

knex *: por padrão, nesse projeto, foi inserida a configuração de client do knex para utilizar PostgreSQL. Então, basta inserir as credenciais apresentadas no arquivo 'knexfile.ts' em um arquivo .env.

## Scripts Prontos:

 - 'start': o script start deverá ser utilizado quando o projeto estiver em produção, assim, será utilizado o pacote ts-node para execução dos arquivos Typescript.

 - 'dev': deverá ser utilizado quando o projeto estiver em desenvolvimento. Isso fará com que o pacote ts-node-dev seja executado ao invés do ts-node, deixando a experiência de testes mais tranquila através da constante insistência em deixar o servidor online, "respawnando" a instância da aplicação serve que ouver alguma alteração e também ignorando arquivos desnecessários de verificação, como a pasta node_modules.

 - 'knex:migrate': deverá ser utilizado quando há uma nova atualização a ser realizada no banco de dados.

 - 'knex:migrate:rollback': deverá ser utilizado quando for necessário desfazer uma atualização realizada no banco de dados.

 - 'knex:seed': deverá ser executado quando for necessário inserir 'seeds' (dados básicos) ao banco de dados, como, por exemplo, uma lista de produtos que já estarão cadastrados para primeiro funcionamento.

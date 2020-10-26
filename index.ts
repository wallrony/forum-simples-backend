import server from './src/server';

require('dotenv-safe').config({
  allowEmptyValues: true
});

server.listen(process.env.PORT || 3333, () => console.log('Server is online'));
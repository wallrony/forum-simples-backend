import Knex from 'knex';
import User from '../../../core/models/User';

export async function seed(knex: Knex) {
  const users: User[] = [
    {
      name: 'Administrador',
      username: 'admin'
    },
    {
      name: 'Wallisson Rony',
      username: 'wallrony'
    },
  ];

  return await knex('users').insert(users);
}

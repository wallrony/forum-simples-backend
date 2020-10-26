import Knex from 'knex';
import Post from '../../../core/models/Post';

export async function seed(knex: Knex) {
  const posts: Post[] = [
    {
      title: 'Post inicial',
      content: 'Esse é um post inicial incluso no seed de posts.',
      user_id: 1,
    }
  ];

  return await knex('posts').insert(posts);
}

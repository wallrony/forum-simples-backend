import Knex from 'knex';
import PostLike from '../../../core/models/PostLike';

export async function seed(knex: Knex) {
  const postLikes: PostLike[] = [
    {
      like: true,
      post_id: 1,
      user_id: 1
    },
    {
      like: true,
      post_id: 1,
      user_id: 2
    },
  ];

  return await knex('post_likes').insert(postLikes);
}

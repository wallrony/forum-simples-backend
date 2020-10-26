import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('post_likes', table => {
    table.integer('user_id').notNullable();
    table.integer('post_id').notNullable();

    table.boolean('like').notNullable();

    table.foreign('user_id').references('id').inTable('users');
    table.foreign('post_id').references('is').inTable('posts');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('post_likes');
}

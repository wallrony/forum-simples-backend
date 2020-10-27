import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('posts', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.integer('likes').defaultTo(0);
    table.integer('unlikes').defaultTo(0);
    table.integer('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('posts');
}

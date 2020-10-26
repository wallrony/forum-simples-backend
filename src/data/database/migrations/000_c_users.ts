import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('username').notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('users');
}

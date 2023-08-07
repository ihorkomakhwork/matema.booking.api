import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('clients', (c) => {
    c.increments('id');
    c.string('name', 30);
    c.string('second_name', 30);
    c.string('last_name', 30);
    c.specificType('phone', 'text ARRAY');
    c.specificType('email', 'text ARRAY');
    c.string('role', 8);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('clients');
}
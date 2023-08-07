import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (users) => {
    users.increments('id');
    users.string('telegramId', 30);
    users.string('role', 7);
    users.string('username', 30);
    users.boolean('isSuperUser');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('settings', (users) => {
    users.increments('id');
    users.string('calendarId', 50);
    users.string('summary', 50);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('settings');
}
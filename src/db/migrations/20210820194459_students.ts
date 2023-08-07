import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('students', (s) => {
    s.increments('id');
    s.string('name', 30);
    s.specificType('phone', 'text ARRAY');
    s.specificType('email', 'text ARRAY');
    s.string('goal', 256);
    s.string('class', 10);
    s.string('task', 16);
    s.integer('client_id').references('id').inTable('clients');
    s.integer('student_id').unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('students');
}
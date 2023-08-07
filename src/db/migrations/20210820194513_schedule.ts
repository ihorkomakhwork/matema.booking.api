import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('schedule', (shedule) => {
    shedule.increments('id');
    shedule.date('date');
    shedule.specificType('time_slots', 'integer ARRAY');
    shedule.integer('teacher_id').references('id').inTable('teachers');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('schedule');
}

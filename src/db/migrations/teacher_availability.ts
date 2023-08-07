import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('teacher_availability', (shedule) => {
    shedule.increments('id');
    shedule.string('day');
    shedule.specificType('time_slots', 'string ARRAY');
    shedule.integer('teacher_id').references('id').inTable('teachers');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('schedule');
}

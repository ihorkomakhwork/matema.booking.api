import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('lessons', (l) => {
    l.increments('id');
    l.string('name', 50);
    l.string('zoom_link', 256);
    l.date('date');
    l.integer('status')
    l.specificType('time_slot', 'integer ARRAY');
    l.integer('teacher_id').references('id').inTable('teachers');
    l.integer('student_id').references('student_id').inTable('students');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('lessons');
}

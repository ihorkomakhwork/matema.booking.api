import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('reports', (r) => {
    r.increments('id');
    r.string('duration', 50);
    r.specificType('emails', 'text ARRAY');
    r.time('start_time');
    r.time('end_time');
    r.integer('lesson_id').references('id').inTable('lessons');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('reports');
}

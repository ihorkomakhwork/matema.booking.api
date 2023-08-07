import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('teachers', (t) => {
    t.increments("id");
    t.string("name", 30);
    t.string("second_name", 30);
    t.string("last_name", 30);    
    t.specificType('phone', 'text ARRAY');
    t.specificType('email', 'text ARRAY');
    t.string("status", 13);
    t.string("profile", 8);
    t.string("class", 15);
    t.integer("user_id").references('id').inTable('users');
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('teachers');
}
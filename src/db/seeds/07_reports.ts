import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return await knex('reports')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('reports').insert([]);
    });
}

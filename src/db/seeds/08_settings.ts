import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return await knex('settings')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('settings').insert([]);
    });
}
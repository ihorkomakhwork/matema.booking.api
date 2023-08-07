import * as Knex from 'knex';
import { Role } from '../../enums/ClientEnums';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return await knex('clients')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        {
          first_name: 'Василь',
          patronymic: 'Богданович',
          last_name: 'Петренко',
          phones: ['+38022222223', '380934581243'],
          emails: ['test3@gmail.com', 'example@pepsi.com'],
          role: Role.guardian,
        },
        {
          first_name: 'Євгеній',
          patronymic: 'Андрійович',
          last_name: 'Конопленко',
          phones: ['+380228220482', '380228220482'],
          emails: ['test3@gmail.com'],
          role: Role.father,
        },
      ]);
    });
}

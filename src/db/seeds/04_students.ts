import * as Knex from 'knex';
import { Class, Task } from '../../enums/StudentEnums';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return await knex('students')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {
          first_name: 'Ivan',
          last_name: 'Ivanov',
          patronymic: 'Petrovich',
          phones: ['+380681111111'],
          task: Task.DPA,
          goal: 'test',
          class: Class.class9,
          emails: ['test@gmail.com'],
          client_id: '1',
        },
        {
          first_name: 'Dmitro',
          last_name: 'Sidorchuk',
          patronymic: 'Ivanovich',
          phones: ['+380682211111'],
          task: Task.SchoolProgram,
          goal: 'test',
          class: Class.class10,
          emails: ['test3@gmail.com'],
          client_id: '2',
        },
      ]);
    });
}

import * as Knex from 'knex';
import { Profile, Status } from '../../enums/TeacherEnums';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return await knex('teachers')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('teachers').insert([
        {
          first_name: 'Ярослав',
          patronymic: 'Владиславович',
          last_name: 'Крамар',
          phone: ['380675242973', '380925672984'],
          emails: ['example_teacher1@gmail.com'],
          class: '5-11',
          status: Status.Working,
          profile: Profile.ZNO,
          user_id: 2,
        },
        {
          first_name: 'Микола',
          patronymic: 'Русланович',
          last_name: 'Василенко',
          phone: ['380975236478', '380936830328'],
          emails: ['example_teacher@gmail.com'],
          class: '5-9',
          status: Status.Working,
          profile: Profile.DPA,
          user_id: 2,
        },
      ]);
    });
}

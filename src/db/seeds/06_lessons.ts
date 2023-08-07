import * as Knex from 'knex';
import { StatusId } from '../../enums/LessonEnums';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return await knex('lessons')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('lessons').insert([
        {
          name: 'Math',
          date: '2021-08-15',
          status: StatusId.Unconfirm,
          time_slot: '{0,1,2,3,5,6,7,8,9}',
          teacher_id: '2',
          student_id: '1',
        },
        {
          name: 'Math',
          date: '2021-08-16',
          status: StatusId.Unconfirm,
          time_slot: '{0,1,2,3,5,6,7,8,9}',
          teacher_id: '1',
          student_id: '1',
        },
        {
          name: 'Physics',
          date: '2021-08-18',
          status: StatusId.Unconfirm,
          time_slot: '{18,19,20,21,22,23,24,25,26}',
          teacher_id: '1',
          student_id: '2',
        },
      ]);
    });
}

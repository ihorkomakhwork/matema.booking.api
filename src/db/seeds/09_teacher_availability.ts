import * as Knex from 'knex';
import { WorkDay } from '../../enums/ScheduleEnums';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return await knex('schedule')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('teacher_availability').insert([
        {
          day: WorkDay.MONDAY,
          time_slots: '{"07:00 - 15:30","23:00 - 24:00"}',
          teacher_id: '1'
        },
        {
          date: WorkDay.THURSDAY,
          time_slots: '{"00:30 - 10:30","11:00 - 18:00","19:00 - 20:00"}',
          teacher_id: '1'
        },
        {
          date: WorkDay.WEDNESDAY,
          time_slots: '{"07:00 - 15:30","21:00 - 23:00"}',
          teacher_id: '1'
        },
        {
          date: WorkDay.THURSDAY,
          time_slots: '{"07:00 - 15:30","22:00 - 24:00"}',
          teacher_id: '1'
        },
        {
          date: WorkDay.FRIDAY,
          time_slots: '{"07:00 - 15:30","22:00 - 24:00"}',
          teacher_id: '1'
        },
        {
          date: WorkDay.SATURDAY,
          time_slots: '{"07:00 - 15:30","22:00 - 24:00"}',
          teacher_id: '1'
        },
        {
          date: WorkDay.SUNDAY,
          time_slots: '{"08:30 - 11:30","13:00 - 15:00","16:00 - 18:00"}',
          teacher_id: '1'
        },
        {
          day: WorkDay.MONDAY,
          time_slots: '{"07:00 - 15:30","23:00 - 24:00"}',
          teacher_id: '2'
        },
        {
          date: WorkDay.THURSDAY,
          time_slots: '{"00:30 - 10:30","11:00 - 18:00","19:00 - 20:00"}',
          teacher_id: '2'
        },
        {
          date: WorkDay.WEDNESDAY,
          time_slots: '{"07:00 - 15:30","21:00 - 23:00"}',
          teacher_id: '2'
        },
        {
          date: WorkDay.THURSDAY,
          time_slots: '{"07:00 - 15:30","22:00 - 24:00"}',
          teacher_id: '2'
        },
        {
          date: WorkDay.FRIDAY,
          time_slots: '{"07:00 - 15:30","22:00 - 24:00"}',
          teacher_id: '2'
        },
        {
          date: WorkDay.SATURDAY,
          time_slots: '{"07:00 - 15:30","22:00 - 24:00"}',
          teacher_id: '2'
        },
        {
          date: WorkDay.SUNDAY,
          time_slots: '{"08:30 - 11:30","13:00 - 15:00","16:00 - 18:00"}',
          teacher_id: '2'
        }
      ]);
    });
}
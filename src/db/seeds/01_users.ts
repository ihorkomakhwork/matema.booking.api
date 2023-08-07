import * as Knex from 'knex';
import { Role } from '../../enums/UserEnums';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return await knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { telegramId: 'telegram_1',
          role: Role.ADMIN,
          username: 'user1',
          isSuperUser: false
        },
        {
          telegramId: 'telegram_2',
          role: Role.ADMIN,
          username: 'user2',
          isSuperUser: true
        },
        {
          telegramId: 'telegram_3',
          role: Role.MANAGER,
          username: 'user3',
          isSuperUser: false
        }
      ]);
    });
}

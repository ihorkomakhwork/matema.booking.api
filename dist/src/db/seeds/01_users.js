"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const UserEnums_1 = require("../../enums/UserEnums");
async function seed(knex) {
    // Deletes ALL existing entries
    return await knex('users')
        .del()
        .then(function () {
        // Inserts seed entries
        return knex('users').insert([
            { telegramId: 'telegram_1',
                role: UserEnums_1.Role.ADMIN,
                username: 'user1',
                isSuperUser: false
            },
            {
                telegramId: 'telegram_2',
                role: UserEnums_1.Role.ADMIN,
                username: 'user2',
                isSuperUser: true
            },
            {
                telegramId: 'telegram_3',
                role: UserEnums_1.Role.MANAGER,
                username: 'user3',
                isSuperUser: false
            }
        ]);
    });
}
exports.seed = seed;
//# sourceMappingURL=01_users.js.map
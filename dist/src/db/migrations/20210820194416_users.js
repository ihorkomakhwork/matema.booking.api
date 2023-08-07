"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('users', (users) => {
        users.increments('id');
        users.string('telegramId', 30);
        users.string('role', 7);
        users.string('username', 30);
        users.boolean('isSuperUser');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('users');
}
exports.down = down;
//# sourceMappingURL=20210820194416_users.js.map
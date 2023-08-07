"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('settings', (users) => {
        users.increments('id');
        users.string('calendarId', 50);
        users.string('summary', 50);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('settings');
}
exports.down = down;
//# sourceMappingURL=settings.js.map
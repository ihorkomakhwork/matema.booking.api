"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('schedule', (shedule) => {
        shedule.increments('id');
        shedule.date('date');
        shedule.specificType('time_slots', 'integer ARRAY');
        shedule.integer('teacher_id').references('id').inTable('teachers');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('schedule');
}
exports.down = down;
//# sourceMappingURL=20210820194513_schedule.js.map
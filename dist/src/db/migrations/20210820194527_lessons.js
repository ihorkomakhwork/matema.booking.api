"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('lessons', (l) => {
        l.increments('id');
        l.string('name', 50);
        l.string('zoom_link', 256);
        l.date('date');
        l.integer('status');
        l.specificType('time_slot', 'integer ARRAY');
        l.integer('teacher_id').references('id').inTable('teachers');
        l.integer('student_id').references('student_id').inTable('students');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('lessons');
}
exports.down = down;
//# sourceMappingURL=20210820194527_lessons.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('reports', (r) => {
        r.increments('id');
        r.string('duration', 50);
        r.specificType('emails', 'text ARRAY');
        r.time('start_time');
        r.time('end_time');
        r.integer('lesson_id').references('id').inTable('lessons');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('reports');
}
exports.down = down;
//# sourceMappingURL=20210820194540_reports.js.map
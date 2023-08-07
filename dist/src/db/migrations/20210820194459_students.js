"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('students', (s) => {
        s.increments('id');
        s.string('name', 30);
        s.specificType('phone', 'text ARRAY');
        s.specificType('email', 'text ARRAY');
        s.string('goal', 256);
        s.string('class', 10);
        s.string('task', 16);
        s.integer('client_id').references('id').inTable('clients');
        s.integer('student_id').unique();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('students');
}
exports.down = down;
//# sourceMappingURL=20210820194459_students.js.map
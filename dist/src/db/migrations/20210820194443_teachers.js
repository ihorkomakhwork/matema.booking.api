"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('teachers', (t) => {
        t.increments("id");
        t.string("name", 30);
        t.string("second_name", 30);
        t.string("last_name", 30);
        t.specificType('phone', 'text ARRAY');
        t.specificType('email', 'text ARRAY');
        t.string("status", 13);
        t.string("profile", 8);
        t.string("class", 15);
        t.integer("user_id").references('id').inTable('users');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('teachers');
}
exports.down = down;
//# sourceMappingURL=20210820194443_teachers.js.map
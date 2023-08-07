"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('clients', (c) => {
        c.increments('id');
        c.string('name', 30);
        c.string('second_name', 30);
        c.string('last_name', 30);
        c.specificType('phone', 'text ARRAY');
        c.specificType('email', 'text ARRAY');
        c.string('role', 8);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('clients');
}
exports.down = down;
//# sourceMappingURL=20210820194430_clients.js.map
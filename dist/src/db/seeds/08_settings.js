"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    return await knex('settings')
        .del()
        .then(function () {
        // Inserts seed entries
        return knex('settings').insert([]);
    });
}
exports.seed = seed;
//# sourceMappingURL=08_settings.js.map
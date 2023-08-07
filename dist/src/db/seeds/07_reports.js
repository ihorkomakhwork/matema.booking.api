"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    return await knex('reports')
        .del()
        .then(function () {
        // Inserts seed entries
        return knex('reports').insert([]);
    });
}
exports.seed = seed;
//# sourceMappingURL=07_reports.js.map
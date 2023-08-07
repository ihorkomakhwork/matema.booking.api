"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const ClientEnums_1 = require("../../enums/ClientEnums");
async function seed(knex) {
    // Deletes ALL existing entries
    return await knex('clients')
        .del()
        .then(function () {
        // Inserts seed entries
        return knex('clients').insert([
            {
                first_name: 'Василь',
                patronymic: 'Богданович',
                last_name: 'Петренко',
                phones: ['+38022222223', '380934581243'],
                emails: ['test3@gmail.com', 'example@pepsi.com'],
                role: ClientEnums_1.Role.guardian,
            },
            {
                first_name: 'Євгеній',
                patronymic: 'Андрійович',
                last_name: 'Конопленко',
                phones: ['+380228220482', '380228220482'],
                emails: ['test3@gmail.com'],
                role: ClientEnums_1.Role.father,
            },
        ]);
    });
}
exports.seed = seed;
//# sourceMappingURL=02_clients.js.map
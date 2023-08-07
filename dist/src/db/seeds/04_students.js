"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const StudentEnums_1 = require("../../enums/StudentEnums");
async function seed(knex) {
    // Deletes ALL existing entries
    return await knex('students')
        .del()
        .then(function () {
        // Inserts seed entries
        return knex('students').insert([
            {
                first_name: 'Ivan',
                last_name: 'Ivanov',
                patronymic: 'Petrovich',
                phones: ['+380681111111'],
                task: StudentEnums_1.Task.DPA,
                goal: 'test',
                class: StudentEnums_1.Class.class9,
                emails: ['test@gmail.com'],
                client_id: '1',
            },
            {
                first_name: 'Dmitro',
                last_name: 'Sidorchuk',
                patronymic: 'Ivanovich',
                phones: ['+380682211111'],
                task: StudentEnums_1.Task.SchoolProgram,
                goal: 'test',
                class: StudentEnums_1.Class.class10,
                emails: ['test3@gmail.com'],
                client_id: '2',
            },
        ]);
    });
}
exports.seed = seed;
//# sourceMappingURL=04_students.js.map
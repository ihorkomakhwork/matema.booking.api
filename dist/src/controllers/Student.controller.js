"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentByID = exports.deleteStudent = exports.createStudent = void 0;
const knex_1 = __importDefault(require("../db/knex"));
const createStudent = async (req, res, next) => {
    try {
        const { first_name, last_name, patronymic, phones, emails, goal, class_, task, client_id, } = req.body;
        const student = await knex_1.default('students').returning('*').insert({
            first_name: first_name,
            last_name: last_name,
            patronymic: patronymic,
            phones: phones,
            emails: emails,
            goal: goal,
            class: class_,
            task: task,
            client_id: client_id,
        });
        return res.status(201).json(student[0]);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).send(error);
    }
};
exports.createStudent = createStudent;
const deleteStudent = async (req, res) => {
    try {
        await knex_1.default('students').where('id', req.query.id).del();
        return res
            .status(200)
            .json({ message: `Student with ID ${req.query.id} has been deleted ` });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(404).send(error);
    }
};
exports.deleteStudent = deleteStudent;
const getStudentByID = async (id) => {
    try {
        const result = await knex_1.default('students').where("id", id).first();
        console.log(result);
        return result;
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return error;
    }
};
exports.getStudentByID = getStudentByID;
//# sourceMappingURL=Student.controller.js.map
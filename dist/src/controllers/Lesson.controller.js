"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelLesson = exports.acceptLesson = exports.deleteLesson = exports.createLesson = void 0;
const knex_1 = __importDefault(require("../db/knex"));
const LessonEnums_1 = require("../enums/LessonEnums");
const LessonsHelper_1 = require("../helpers/LessonsHelper");
const createLesson = async (req, res) => {
    try {
        const lessons = req.body.lessons;
        if (!(lessons.length == 1 || lessons.length == 10)) {
            throw new Error("invalid length of array");
        }
        const newLesson = await knex_1.default('lessons').returning('*').insert(lessons);
        const shedulWhere = newLesson.map((lesson) => {
            return [lesson.teacher_id, lesson.date];
        });
        const schedul = await knex_1.default('schedule').whereIn(["teacher_id", "date"], shedulWhere);
        let timeslots = [];
        for (let i = 0; i < newLesson.length; ++i) {
            const slot = newLesson[i].time_slot;
            var updateSlots = schedul[i].time_slots.filter((x) => !slot.includes(x));
            timeslots.push(schedul[i].time_slots.filter((x) => !slot.includes(x)));
            if (JSON.stringify(updateSlots) === JSON.stringify(schedul[i].time_slots))
                return res.status(201).json('На цей час вже існує урок');
        }
        knex_1.default.transaction(async (trx) => {
            try {
                const res = await knex_1.default('schedule').transacting(trx).select().whereIn(["teacher_id", "date"], shedulWhere);
                await LessonsHelper_1.updateTimeSlots(res, timeslots, trx, knex_1.default);
                await LessonsHelper_1.trxCommit(trx);
            }
            catch (err) {
                trx.rollback();
                throw new Error("There was an error updating schedules");
            }
        });
        return res.status(201).json('Lesson have created');
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
exports.createLesson = createLesson;
const deleteLesson = async (req, res, next) => {
    try {
        const result = await knex_1.default('lessons').where('id', req.query.id);
        const schedul = await knex_1.default('schedule').where({
            teacher_id: result[0].teacher_id,
            date: result[0].date,
        });
        const slot = result[0].time_slot;
        //if we save slot as array , comment on next colum
        // const arr = slot.split(',')
        // let arrInt = arr.map(function (x: string) {
        //     return parseInt(x, 10);
        // });
        // and change "slot" on "arrInt"
        slot.forEach((e) => {
            schedul[0].time_slots.push(e);
        });
        let sorted = schedul[0].time_slots.sort(function (a, b) {
            return a - b;
        });
        await knex_1.default('schedule')
            .where({
            teacher_id: result[0].teacher_id,
            date: result[0].date,
        })
            .update('time_slots', sorted);
        await knex_1.default('lessons').where('id', req.query.id).del();
        return res
            .status(200)
            .json({ message: `lesson with ID ${req.query.id} has been deleted ` });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(404).send(error);
    }
};
exports.deleteLesson = deleteLesson;
const acceptLesson = async (req, res) => {
    try {
        await knex_1.default('lessons')
            .where('id', '=', req.query.id)
            .update({ status: LessonEnums_1.StatusId.Accept });
        return res.status(200).json({ message: 'Lesson has been confirmed' });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(404).send(error);
    }
};
exports.acceptLesson = acceptLesson;
const cancelLesson = async (req, res) => {
    try {
        await knex_1.default('lessons')
            .where('id', '=', req.query.id)
            .update({ status: LessonEnums_1.StatusId.Unconfirm });
        return res.status(200).json({ message: 'Lesson has been canceled' });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(404).send(error);
    }
};
exports.cancelLesson = cancelLesson;
//# sourceMappingURL=Lesson.controller.js.map
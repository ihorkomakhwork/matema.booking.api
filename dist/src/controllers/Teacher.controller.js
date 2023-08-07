"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeachersFreeSlots = exports.getTeacherByID = exports.getTeachersByLastName = exports.getTeachers = exports.deleteTeacher = exports.createTeacher = void 0;
const TeacherHelper_1 = require("../helpers/TeacherHelper");
const configs_1 = __importDefault(require("../configs"));
const knex_1 = __importDefault(require("../db/knex"));
const { types } = require('pg');
const TYPE_DATESTAMP = 1082;
types.setTypeParser(TYPE_DATESTAMP, (date) => date);
const createTeacher = async (req, res) => {
    try {
        const { first_name, last_name, patronymic, emails, phones, status, profile, classes, user_id } = req.body;
        const newTeacher = await knex_1.default("Teachers").insert({
            first_name: first_name,
            last_name: last_name,
            patronymic: patronymic,
            status: status,
            profile: profile,
            class: classes,
            user_id: user_id
        });
        await knex_1.default("teachers").update({ phones: knex_1.default.raw('array_append(phones, ?)', [phones]) });
        await knex_1.default("teachers").update({ emails: knex_1.default.raw('array_append(emails, ?)', [emails]) });
        return res.status(201).json(newTeacher);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).send(error);
    }
};
exports.createTeacher = createTeacher;
const deleteTeacher = async (req, res) => {
    try {
        const result = await knex_1.default("teachers").where("id", req.query.id).del();
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(404).send(error);
    }
};
exports.deleteTeacher = deleteTeacher;
const getTeachers = async (req, res, next) => {
    try {
        let limit = 3;
        let page = parseInt(req.query.page);
        const num = await knex_1.default('teachers').count();
        let bigger = num[0].count;
        if (page < 1 || page > bigger / limit) {
            page = 1;
        }
        // if we don`t get page we will get all users
        if (!page)
            limit = bigger;
        let teachers = await knex_1.default('teachers').limit(limit).offset(Math.ceil((page - 1) * limit)).select();
        return res.json(teachers);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(404).send(error);
    }
};
exports.getTeachers = getTeachers;
const getTeachersByLastName = async (req, res) => {
    var _a;
    try {
        const lastName = (_a = req.query.lastName) === null || _a === void 0 ? void 0 : _a.toString();
        const result = await knex_1.default('teachers').whereRaw('last_name Like ?', [`%${lastName}%`]);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(404).send(error);
    }
};
exports.getTeachersByLastName = getTeachersByLastName;
const getTeacherByID = async (id) => {
    try {
        const result = await knex_1.default('teachers').where("id", id).first();
        console.log(result);
        return result;
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return error;
    }
};
exports.getTeacherByID = getTeacherByID;
const getTeachersFreeSlots = async (req, res) => {
    try {
        const teacherId = parseInt(req.params.teacherId);
        let dateCursor;
        let dateFrom;
        let dateTo;
        const cursor = req.query.cursor;
        if (!cursor) {
            dateCursor = req.query.dateFrom;
            dateFrom = req.query.dateFrom;
            dateTo = req.query.dateTo;
            if (!dateFrom || !dateTo) {
                console.log(`Request is incorrect. Сheck the presence and format of the params.`);
                return res.status(400).send('Request is incorrect. Сheck the presence and format of the params.');
            }
        }
        let nextEncoded, prevEncoded = "";
        let resultData = [];
        let resultMeta = {};
        let slotsIndexCursor = 0;
        let forward = true;
        let step = 1;
        //if cursor present in request parameters, decode it and save values
        if (cursor) {
            // create a buffer
            const buff = Buffer.from(cursor.toString(), 'base64');
            // decode buffer as UTF-8
            try {
                const cursorDecoded = JSON.parse(buff.toString('utf-8'));
                // save values to local variables
                dateCursor = cursorDecoded.cursorDate;
                slotsIndexCursor = cursorDecoded.cursorIndex_Id;
                forward = cursorDecoded.forward;
                dateFrom = cursorDecoded.dateFrom;
                dateTo = cursorDecoded.dateTo;
            }
            catch (error) {
                console.log(`Error: cursor wrong format`);
                return res.status(400).send(error);
            }
            if (!forward)
                step = -1;
        }
        // DB Query to get time slots of specific teacher (teacherId) and date
        let freeSlots;
        if (forward) {
            freeSlots = await knex_1.default('schedule')
                .where('teacher_id', '=', teacherId)
                .andWhere('date', '>=', dateCursor)
                .andWhere('date', '<=', dateTo);
        }
        else {
            freeSlots = await knex_1.default('schedule')
                .where('teacher_id', '=', teacherId)
                .andWhere('date', '<=', dateCursor)
                .andWhere('date', '>=', dateFrom);
        }
        function processSlots(step) {
            // to make sure that the number of slots does not exceed paginationLimit
            let limitCounter = 0;
            // process slots received by DB Query to send human-readable time intervals in response body
            let i = 0;
            let n = freeSlots.length;
            if (!forward) {
                i = freeSlots.length - 1;
                n = -1;
                //slotsIndexCursor += configs.lessonDuration - 1
                //if (slotsIndexCursor < configs.lessonDuration - 1) i += step;
            }
            do {
                let oneDayFreeSlots = freeSlots[i].time_slots;
                // get available time intervals into an array in pairs (start of interval - even position, end - odd position)
                // example: [ 12, 23, 162, 173 ] means intervals (12, 23), (162, 173)
                const dateTemp = freeSlots[i].date;
                if (dateTemp === dateCursor) {
                    if (forward) {
                        oneDayFreeSlots = oneDayFreeSlots.slice(slotsIndexCursor);
                    }
                    else {
                        oneDayFreeSlots = oneDayFreeSlots.slice(0, slotsIndexCursor + configs_1.default.intervalValue);
                    }
                }
                const freeSlotIntervals = TeacherHelper_1.findSlotIntervals(oneDayFreeSlots);
                // for storing time intervals in human-readable style
                // example: ["01:00 - 02:00", "13:30 - 14:30"]
                let freeTimeIntervals = [];
                function createCursor(arg0, arg1, arg2) {
                    const cursorStr = JSON.stringify({
                        cursorIndex_Id: arg0,
                        cursorDate: arg1,
                        forward: arg2,
                        dateFrom: dateFrom,
                        dateTo: dateTo
                    });
                    const buff = Buffer.from(cursorStr, 'utf-8');
                    return buff.toString('base64');
                }
                function createCursors(j) {
                    let currentIndex_Id = freeSlots[i].time_slots.indexOf(freeSlotIntervals[j]);
                    let currentDate = freeSlots[i].date;
                    if (!forward) {
                        [currentIndex_Id, slotsIndexCursor] = [slotsIndexCursor, currentIndex_Id];
                        // @ts-ignore
                        [currentDate, dateCursor] = [dateCursor, currentDate];
                    }
                    nextEncoded = createCursor(currentIndex_Id, currentDate, true);
                    prevEncoded = createCursor(slotsIndexCursor, dateCursor, false);
                }
                // process freeSlotIntervals to convert it in freeTimeIntervals
                if (forward) {
                    for (let j = 0; j < freeSlotIntervals.length; j += 2) {
                        limitCounter++;
                        // if number of intervals is equal to paginationLimit
                        // save date and index of the first slot that will be added in the next page
                        // stop processing freeSlotIntervals
                        if (limitCounter > configs_1.default.paginationLimit) {
                            createCursors(j);
                            break;
                        }
                        // convert available slot interval into human-readable interval and push in freeTimeIntervals
                        freeTimeIntervals.push(TeacherHelper_1.slotToTime(freeSlotIntervals[j]) + " - " + TeacherHelper_1.slotToTime(freeSlotIntervals[j + 1] + 1));
                    }
                }
                else {
                    for (let j = freeSlotIntervals.length - 1; j > 0; j -= 2) {
                        limitCounter++;
                        if (limitCounter > configs_1.default.paginationLimit) {
                            createCursors(j);
                            break;
                        }
                        freeTimeIntervals.unshift(TeacherHelper_1.slotToTime(freeSlotIntervals[j - 1]) + " - " + TeacherHelper_1.slotToTime(freeSlotIntervals[j] + 1));
                    }
                }
                // if freeTimeIntervals has any values, add them in response
                if (freeTimeIntervals.length > 0) {
                    let date = freeSlots[i].date;
                    let resObj = { date: date, time_slots: freeTimeIntervals };
                    if (forward) {
                        resultData.push(resObj);
                    }
                    else {
                        resultData.unshift(resObj);
                    }
                }
                if (limitCounter <= configs_1.default.paginationLimit && i === freeSlots.length - 1 && forward) {
                    prevEncoded = createCursor(slotsIndexCursor, dateCursor, false);
                }
                if (limitCounter <= configs_1.default.paginationLimit && i === 0 && !forward) {
                    nextEncoded = createCursor(slotsIndexCursor, dateCursor, true);
                }
                // if there are cursors for next and/or previous page(s), add them in response
                if (limitCounter > configs_1.default.paginationLimit || ((forward && i === freeSlots.length - 1) || (!forward && i === 0))) {
                    if (nextEncoded && prevEncoded && cursor) {
                        resultMeta = { next: nextEncoded, prev: prevEncoded };
                    }
                    else if (nextEncoded) {
                        resultMeta = { next: nextEncoded };
                    }
                    else if (prevEncoded && cursor) {
                        resultMeta = { prev: prevEncoded };
                    }
                    break;
                }
                i += step;
            } while (n !== i);
        }
        if (freeSlots.length > 0)
            processSlots(step);
        // collect resulting response
        const result = {
            data: resultData,
            meta: {
                cursor: resultMeta
            }
        };
        // send response
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(404).send(error);
    }
};
exports.getTeachersFreeSlots = getTeachersFreeSlots;
//# sourceMappingURL=Teacher.controller.js.map
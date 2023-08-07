import {NextFunction, Request, Response} from "express";
import ITeacher from "../interfaces/Teacher.interface";
import {findSlotIntervals, slotToTime} from "../helpers/TeacherHelper";
import {Cursor} from "../helpers/CustomTypes";
import configs from '../configs';
import knex from "../db/knex";


const {types} = require('pg');
const TYPE_DATESTAMP = 1082;
types.setTypeParser(TYPE_DATESTAMP, (date: any) => date);


export const createTeacher = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {first_name, last_name, patronymic, emails, phones, status, profile, classes, user_id} = req.body
        const newTeacher = await knex("Teachers").insert({
            first_name: first_name,
            last_name: last_name,
            patronymic: patronymic,
            status: status,
            profile: profile,
            class: classes,
            user_id: user_id
        })
        await knex("teachers").update({phones: knex.raw('array_append(phones, ?)', [phones])})
        await knex("teachers").update({emails: knex.raw('array_append(emails, ?)', [emails])});

        return res.status(201).json(newTeacher);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).send(error);
    }
};

export const deleteTeacher = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await knex("teachers").where("id", req.query.id).del()
        return res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(404).send(error);
    }
};

export const getTeachers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        let limit = 3
        let page: number = parseInt(req.query.page as any)
        const num = await knex('teachers').count()
        let bigger = num[0].count
        if (page < 1 || page > bigger / limit) {
            page = 1
        }
         // if we don`t get page we will get all users
        if (!page) limit = bigger
        let teachers = await knex('teachers').limit(limit).offset(Math.ceil((page - 1) * limit)).select()
        return res.json(teachers);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(404).send(error);
    }
};
export const getTeachersByLastName = async (req: Request, res: Response): Promise<Response> => {
    try {
        const lastName = req.query.lastName?.toString();
        const result = await knex('teachers').whereRaw('last_name Like ?', [`%${lastName}%`]);
        return res.status(200).json(result);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(404).send(error);
    }
};

export const getTeacherByID = async (id: number): Promise<ITeacher> => {
    try {
        const result = await knex('teachers').where("id", id).first();
        console.log(result);
        return result;
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return error;
    }
};



export const getTeachersFreeSlots = async (req: Request, res: Response): Promise<Response> => {
        try {
            const teacherId: number = parseInt(req.params.teacherId);
            let dateCursor: any;
            let dateFrom: any;
            let dateTo: any;
            const cursor = req.query.cursor;
            if (!cursor) {
                dateCursor = req.query.dateFrom;
                dateFrom = req.query.dateFrom;
                dateTo = req.query.dateTo;
                if (!dateFrom || !dateTo){
                    console.log(`Request is incorrect. Сheck the presence and format of the params.`);
                    return res.status(400).send('Request is incorrect. Сheck the presence and format of the params.');
                }
            }

            let nextEncoded: string, prevEncoded: string = "";
            let resultData: Array<object> = [];
            let resultMeta: object = {};
            let slotsIndexCursor = 0;
            let forward = true;
            let step = 1;

            //if cursor present in request parameters, decode it and save values
            if (cursor) {
                // create a buffer
                const buff = Buffer.from(cursor.toString(), 'base64');
                // decode buffer as UTF-8
                try {
                    const cursorDecoded: Cursor = JSON.parse(buff.toString('utf-8'));
                    // save values to local variables
                    dateCursor = cursorDecoded.cursorDate;
                    slotsIndexCursor = cursorDecoded.cursorIndex_Id;
                    forward = cursorDecoded.forward;
                    dateFrom = cursorDecoded.dateFrom;
                    dateTo = cursorDecoded.dateTo;
                }catch(error){
                    console.log(`Error: cursor wrong format`);
                    return res.status(400).send(error);
                }

                if (!forward) step = -1;
            }


            // DB Query to get time slots of specific teacher (teacherId) and date
            let freeSlots: any;
            if (forward) {
                freeSlots = await knex('schedule')
                    .where('teacher_id', '=', teacherId)
                    .andWhere('date', '>=', dateCursor)
                    .andWhere('date', '<=', dateTo);
            } else {
                freeSlots = await knex('schedule')
                    .where('teacher_id', '=', teacherId)
                    .andWhere('date', '<=', dateCursor)
                    .andWhere('date', '>=', dateFrom)
            }

            function processSlots(step: number): void {

                // to make sure that the number of slots does not exceed paginationLimit
                let limitCounter: number = 0;

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

                    let oneDayFreeSlots: number[] = freeSlots[i].time_slots;
                    // get available time intervals into an array in pairs (start of interval - even position, end - odd position)
                    // example: [ 12, 23, 162, 173 ] means intervals (12, 23), (162, 173)

                    const dateTemp: string = freeSlots[i].date;
                    if (dateTemp === dateCursor) {
                        if (forward) {
                            oneDayFreeSlots = oneDayFreeSlots.slice(slotsIndexCursor);
                        } else {
                            oneDayFreeSlots = oneDayFreeSlots.slice(0, slotsIndexCursor + configs.intervalValue);
                        }
                    }

                    const freeSlotIntervals: number[] = findSlotIntervals(oneDayFreeSlots);


                    // for storing time intervals in human-readable style
                    // example: ["01:00 - 02:00", "13:30 - 14:30"]
                    let freeTimeIntervals: string[] = [];

                    function createCursor(arg0: number, arg1: any, arg2: boolean): string {
                        const cursorStr: string = JSON.stringify({
                            cursorIndex_Id: arg0,
                            cursorDate: arg1,
                            forward: arg2,
                            dateFrom: dateFrom,
                            dateTo: dateTo
                        });
                        const buff = Buffer.from(cursorStr, 'utf-8');
                        return buff.toString('base64');
                    }

                    function createCursors(j: number) {

                        let currentIndex_Id: number = freeSlots[i].time_slots.indexOf(freeSlotIntervals[j]);
                        let currentDate: string = freeSlots[i].date;
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
                            if (limitCounter > configs.paginationLimit) {
                                createCursors(j);
                                break;
                            }

                            // convert available slot interval into human-readable interval and push in freeTimeIntervals
                            freeTimeIntervals.push(slotToTime(freeSlotIntervals[j]) + " - " + slotToTime(freeSlotIntervals[j + 1] + 1));
                        }
                    } else {
                        for (let j = freeSlotIntervals.length - 1; j > 0; j -= 2) {
                            limitCounter++;
                            if (limitCounter > configs.paginationLimit) {
                                createCursors(j);
                                break;
                            }
                            freeTimeIntervals.unshift(slotToTime(freeSlotIntervals[j - 1]) + " - " + slotToTime(freeSlotIntervals[j] + 1));
                        }
                    }

                    // if freeTimeIntervals has any values, add them in response
                    if (freeTimeIntervals.length > 0) {
                        let date: string = freeSlots[i].date;
                        let resObj: object = {date: date, time_slots: freeTimeIntervals};
                        if (forward) {
                            resultData.push(resObj);
                        } else {
                            resultData.unshift(resObj);
                        }
                    }

                    if (limitCounter <= configs.paginationLimit && i === freeSlots.length - 1 && forward) {
                        prevEncoded = createCursor(slotsIndexCursor, dateCursor, false);
                    }

                    if (limitCounter <= configs.paginationLimit && i === 0 && !forward) {
                        nextEncoded = createCursor(slotsIndexCursor, dateCursor, true);
                    }

                    // if there are cursors for next and/or previous page(s), add them in response
                    if (limitCounter > configs.paginationLimit || ((forward && i === freeSlots.length - 1) || (!forward && i === 0))) {
                        if (nextEncoded && prevEncoded && cursor) {
                            resultMeta = {next: nextEncoded, prev: prevEncoded};
                        } else if (nextEncoded) {
                            resultMeta = {next: nextEncoded};
                        } else if (prevEncoded && cursor) {
                            resultMeta = {prev: prevEncoded};
                        }
                        break;
                    }

                    i += step;
                } while (n !== i) ;
            }

            if (freeSlots.length > 0) processSlots(step);
            // collect resulting response
            const result: object = {
                data: resultData,
                meta: {
                    cursor: resultMeta
                }
            }
            // send response
            return res.status(200).json(result);
        } catch
            (error) {
            console.log(`Error: ${error.message}`);
            return res.status(404).send(error);
        }
    }
;

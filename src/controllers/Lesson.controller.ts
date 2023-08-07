import { NextFunction, Request, Response } from 'express';
import knex from '../db/knex';
import { StatusId } from '../enums/LessonEnums';
import {CreatedLesson, NewLesson, Schedul} from '../interfaces/Lesson.interface'
import {updateTimeSlots, trxCommit} from '../helpers/LessonsHelper'

export const createLesson = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    
    const lessons: CreatedLesson[] = req.body.lessons;
    
    
    if (!(lessons.length == 1 || lessons.length == 10)){
      throw new Error("invalid length of array"); 
    }
    
    const newLesson: NewLesson[] = await knex('lessons').returning('*').insert(lessons);
    
    const shedulWhere: Array<any>  = newLesson.map((lesson: any) => {
        return [lesson.teacher_id, lesson.date] 
      })
    
    const schedul: Schedul[] = await knex('schedule').whereIn(
      ["teacher_id", "date"], shedulWhere );
      
   let timeslots: Array<number[]> = []
   for (let i = 0; i < newLesson.length; ++i) {
    const slot: number[] = newLesson[i].time_slot;
    var updateSlots: number[] = schedul[i].time_slots.filter((x: number) => !slot.includes(x));
    timeslots.push( schedul[i].time_slots.filter((x: number) => !slot.includes(x)));
    if( JSON.stringify(updateSlots) === JSON.stringify( schedul[i].time_slots)) return res.status(201).json('На цей час вже існує урок');
  }
    
  
  knex.transaction(async (trx: any): Promise<void>  => { 
    try{
    const res = await knex('schedule').transacting(trx).select().whereIn(["teacher_id", "date"], shedulWhere)
    await updateTimeSlots(res, timeslots, trx, knex)
    await trxCommit(trx)
    } catch (err) {
        trx.rollback();
        throw new Error("There was an error updating schedules"); 
    }
    });
    return res.status(201).json('Lesson have created');
  } catch (error) {
     console.log(error)
    return res.status(500).send(error);
  }
};

export const deleteLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const result = await knex('lessons').where('id', req.query.id);
    const schedul = await knex('schedule').where({
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
    slot.forEach((e: any) => {
      schedul[0].time_slots.push(e);
    });
    let sorted = schedul[0].time_slots.sort(function (a: number, b: number) {
      return a - b;
    });

    await knex('schedule')
      .where({
        teacher_id: result[0].teacher_id,
        date: result[0].date,
      })
      .update('time_slots', sorted);
    await knex('lessons').where('id', req.query.id).del();

    return res
      .status(200)
      .json({ message: `lesson with ID ${req.query.id} has been deleted ` });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(404).send(error);
  }
};

export const acceptLesson = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await knex('lessons')
      .where('id', '=', req.query.id)
      .update({ status: StatusId.Accept });
    return res.status(200).json({ message: 'Lesson has been confirmed' });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(404).send(error);
  }
};

export const cancelLesson = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await knex('lessons')
      .where('id', '=', req.query.id)
      .update({ status: StatusId.Unconfirm });
    return res.status(200).json({ message: 'Lesson has been canceled' });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(404).send(error);
  }
};

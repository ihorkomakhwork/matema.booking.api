import { NextFunction, Request, Response } from 'express';
import knex from '../db/knex';
import IStudent from '../interfaces/Student.interface';

import axios from 'axios';

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const {
      first_name,
      last_name,
      patronymic,
      phones,
      emails,
      goal,
      class_,
      task,
      client_id,
    } = req.body;

    const student = await knex('students').returning('*').insert({
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
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).send(error);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await knex('students').where('id', req.query.id).del();

    return res
      .status(200)
      .json({ message: `Student with ID ${req.query.id} has been deleted ` });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(404).send(error);
  }
};

export const getStudentByID = async (id: number): Promise<IStudent> => {
  try {
    const result = await knex('students').where("id", id).first();
    console.log(result);
    return result;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return error;
  }
};

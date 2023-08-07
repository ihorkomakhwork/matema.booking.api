import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import validator from 'validator';
import knex from '../db/knex';
import ClientPhoneNumber from '../interfaces/ClientPhoneNumber.interface';
import IClient  from '../interfaces/Client.interface';

export const createClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { name, last_name, second_name, phones, emails, role }: IClient = req.body;

    const newClient = await knex('clients').insert({
      name,
      last_name,
      second_name,
      role,
      emails,
      phones
    });
    return res.status(201).json(newClient);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  
  }
}

//
// export const deleteClient = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response> => {
//   try {
//     const result = await getRepository(Client).delete(req.params.id);
//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(404).send(`Information not Found with This Id, ${error}`);
//   }
// };
//
export const getClientByTel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { phone }: ClientPhoneNumber = req.params;
    if (
      !validator.isMobilePhone(phone as string, 'any', {
        strictMode: true,
      })
    ) {
      throw new Error('Inavalid telphone number');
    }
    const result = await knex('clients').whereRaw('? = any(phones)', [
      phone,
    ]);
    return res.status(200).send(result);
  } catch (error) {
    return res
      .status(404)
      .send(`Information not Found with This phone number, ${error}`);
  }
};

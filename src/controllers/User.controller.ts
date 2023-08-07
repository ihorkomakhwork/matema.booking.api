 import { Request, Response } from "express";

 import knex from '../db/knex';


 export const getUsersByRole = async (req: Request, res: Response): Promise<Response> => {
   try {
     const telegramUserId = req.headers['x-user-id'];
     const role = req.query.roleId;
     const resSuperUser = await knex('users').select('isSuperUser').where('telegramId', telegramUserId);
     if (!resSuperUser[0].isSuperUser) return res.status(403).json({ message: `Request forbidden` });
     const result = await knex('users').where('role', role);
     return res.status(200).json(result);
   } catch (error) {
     console.log(`Error: ${error.message}`);
     return error;
   }
 };

 export const changeUserRole = async (req: Request, res: Response): Promise<Response> => {
   try {
     const userId = req.params.userId;
     const role = req.body.roleId;
     await knex('users')
       .where('id', '=', userId)
       .update({ role: role });
     return res.status(200).json({ message: `Role for user ${userId} has been changed to ${role}` });
   } catch (error) {
     console.log(`Error: ${error.message}`);
     return error;
   }
 };


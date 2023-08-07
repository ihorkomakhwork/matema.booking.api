"use strict";
// import { Request, Response } from "express";
// import { getRepository } from "typeorm";
// import { Schedule } from "../entity/Schedule";
// export const createCategory = async(req: Request, res: Response): Promise<Response> => {
//   try {
//     const newSchedule = getRepository(Schedule).create(req.body);
//     await getRepository(Schedule).save(newSchedule);
//     return res.status(201).json(newSchedule);
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//     return res.status(500).send(error);
//   }
// };
// export const deleteSchedule = async(req: Request, res:Response): Promise<Response> => {
//   try {
//     const result = await getRepository(Schedule).delete(req.params.id);
//     return res.status(200).json(result); 
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//     return res.status(404).send(error);
//   }
// };
//# sourceMappingURL=Schedule.controller.js.map
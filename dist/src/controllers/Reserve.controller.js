"use strict";
// import { NextFunction, Request, Response } from "express";
// import { getRepository } from "typeorm";
// import { Reserve } from "../entity/Reserve";
// export const createReserve = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response> => {
//   try {
//     const newReserve = getRepository(Reserve).create(req.body);
//     await getRepository(Reserve).save(newReserve);
//     return res.status(201).json(newReserve);
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// };
// export const deleteReserve = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response> => {
//   try {
//     const result = await getRepository(Reserve).delete(req.params.id);
//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(404).send(`Information not Found with This Id, ${error}`);
//   }
// };
//# sourceMappingURL=Reserve.controller.js.map
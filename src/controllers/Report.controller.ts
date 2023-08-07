// import { NextFunction, Request, Response } from "express";
// import { getRepository } from "typeorm";
// import { Report } from "../entity/Reports";

// export const createReport = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response> => {
//   try {
//     const newReport = getRepository(Report).create(req.body);
//     await getRepository(Report).save(newReport);
//     return res.status(201).json(newReport);
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// };

// export const deleteReport = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response> => {
//   try {
//     const result = await getRepository(Report).delete(req.params.id);
//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(404).send(`Information not Found with This Id, ${error}`);
//   }
// };

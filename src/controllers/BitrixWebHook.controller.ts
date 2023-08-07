import { Request, Response } from 'express';
import knex from '../db/knex';
import { CRMEvent } from '../enums/CRMEventEnum';
import { addContact, addDeal, seedDB, updateContact, updateDeal } from '../helpers/BitrixHelper';

require('dotenv').config();
const bitrixToken = process.env.BITRIX_TOKEN_WEBHOOK || '3nfb1rccdksgd51oxa28wiz9ybwbjrt1';

export const bitrixEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { application_token } = req.body.auth;

    if (
      application_token?.toString() !== bitrixToken
    ) {
      return res.status(401).send();
    }
    const { event, data } = req.body;
    const bitrixFieldsId: number = data.FIELDS.ID;
    
    switch (event) {
      case CRMEvent.addContact:
        await addContact(bitrixFieldsId);
        break;
      case CRMEvent.deleteContact:
        // because we don't know contact type, we need to search on teacher, students, clients table
        await knex('clients').where('id', bitrixFieldsId).del();
        await knex('teachers').where('id', bitrixFieldsId).del();
        break;
      case CRMEvent.updateContact:
        // const dataFromBitrix = await currentDataById(bitrixApiLink, bitrixFieldsId);
        await updateContact(bitrixFieldsId);
        break;
      case CRMEvent.addDeal:
        await addDeal(bitrixFieldsId);
        break;
      case CRMEvent.deleteDeal:
        await knex('students').where('id', bitrixFieldsId).del();
        break;
      case CRMEvent.updateDeal:
        await updateDeal(bitrixFieldsId);
        break;

      default:
        res.status(404).send(`Status ${event} not supported`);
        break;
    }
    return res.status(200).send();
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(404).send(error);
  }
};

export const copyDataFromBitrix = async (req: Request, res: Response): Promise<Response> => {
  try {
    await seedDB();
    return res.status(200).send('Data copied');
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(404).send(error);
  }
}


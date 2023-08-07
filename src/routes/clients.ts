 import { Router } from 'express';
// import { getConnection } from 'typeorm';
// import { Client } from '../entity/Client';
 import { createClient, getClientByTel} from '../controllers/Client.controller'

 const router = Router();

 router.post('/', createClient);
 router.get('/:phone', getClientByTel);

 export default router;

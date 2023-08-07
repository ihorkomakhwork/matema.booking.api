import { Router } from 'express';
import { bitrixEvent, copyDataFromBitrix} from '../controllers/BitrixWebHook.controller';

 const router = Router();

 router.post(`/event`, bitrixEvent);
 router.get(`/copyDataFromBitrix`, copyDataFromBitrix );

 export default router;

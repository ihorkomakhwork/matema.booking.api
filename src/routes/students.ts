import { Router } from 'express';
import { createStudent, deleteStudent } from '../controllers/Student.controller'

 const router = Router();

 router.post('/create', createStudent); 
 router.delete('/deleteStudent', deleteStudent);
 
 export default router;

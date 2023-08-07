import express, {NextFunction, Request, Response} from 'express';
import createHttpError from 'http-errors';
import {errorHandlerMiddleware} from './middlewares/error.middleware';
import {tokenHandlerMiddleware} from './middlewares/token.middleware'
import clientRoute from './routes/clients';
import lessonRouter from './routes/lessons';
import studentRoute from './routes/students';
import teacherRoute from './routes/teachers';
import birtixRoute from './routes/bitrix';
import zoomRoute from './routes/zoom';
import googleRoute from './routes/google';
import userRoute from './routes/users';
import {getTeacherByID} from './controllers/Teacher.controller';


const cors = require('cors')

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());



async function start() {
    try {
        app.listen(PORT, () =>
            console.log(`Server is listening at http://localhost:${PORT}`)
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

start();

app.use(tokenHandlerMiddleware);

app.use('/clients', clientRoute);
app.use('/students', studentRoute);
app.use('/users', userRoute);
app.use('/teachers', teacherRoute);
app.use('/lessons', lessonRouter);
app.use('/bitrix', birtixRoute);
app.use('/zoom', zoomRoute);
app.use('/google', googleRoute);


app.use(errorHandlerMiddleware);

app.use((req, _res, next) => {
    if (req.method !== 'GET') {
        next(createHttpError(405));
        return;
    }
    next(createHttpError(404));
});



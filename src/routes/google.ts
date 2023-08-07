import { Router } from 'express';
import {generateAuthUrl, generateAuthToken, getGoogleCalendars, createCalendar, getAllCalendars, deleteCalendar } from '../controllers/GoogleCalendar.controller';

const router = Router();

router.get(`/auth/url`, generateAuthUrl);
router.post(`/auth/token`, generateAuthToken);
router.get(`/calendars`, getGoogleCalendars);
router.post(`/calendar/connect`, createCalendar);
router.get(`/db/calendars`, getAllCalendars);
router.delete(`/:id/calendar`, deleteCalendar);

export default router;
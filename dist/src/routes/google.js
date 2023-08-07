"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GoogleCalendar_controller_1 = require("../controllers/GoogleCalendar.controller");
const router = express_1.Router();
router.get(`/auth/url`, GoogleCalendar_controller_1.generateAuthUrl);
router.post(`/auth/token`, GoogleCalendar_controller_1.generateAuthToken);
router.get(`/calendars`, GoogleCalendar_controller_1.getGoogleCalendars);
router.post(`/calendar/connect`, GoogleCalendar_controller_1.createCalendar);
router.get(`/db/calendars`, GoogleCalendar_controller_1.getAllCalendars);
router.delete(`/:id/calendar`, GoogleCalendar_controller_1.deleteCalendar);
exports.default = router;
//# sourceMappingURL=google.js.map
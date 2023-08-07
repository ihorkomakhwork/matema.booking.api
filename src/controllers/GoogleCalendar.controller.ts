import { Request, Response } from 'express';
import {ILesson} from '../interfaces/Lesson.interface';
import ICalendarEvent from '../interfaces/GoogleCalendarEvent.interface';
import { getTeacherByID } from '../controllers/Teacher.controller';
import { getStudentByID } from '../controllers/Student.controller';
import { calendar_v3 } from 'googleapis';
import Schema$CalendarList = calendar_v3.Schema$CalendarList;
import knex from '../db/knex';

const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';
//const credentialsPath = path.resolve(__dirname, process.env.KEYFILE_OAuth || '../credentials.json');

async function createAuthClient() {
  //const credentials = JSON.parse(await fs.readFile(credentialsPath));
  //const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(process.env.client_id, process.env.client_secret, process.env.redirect_uri);
  return oAuth2Client;
}

async function getCalendarList() {
  let calendar = google.calendar('v3');
  const oAuth2Client = await createAuthClient();
  let token = await fs.readFile(TOKEN_PATH);
  oAuth2Client.setCredentials(JSON.parse(token));
  const calendarRes = await calendar.calendarList.list({
    auth: oAuth2Client,
    maxResults: 100,
  });
  return calendarRes.data;
}

export const generateAuthUrl = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const oAuth2Client = await createAuthClient();

    let authUrl = await oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    return res.status(200).json(authUrl);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(404).send(error);
  }
};

export const generateAuthToken = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const auth_code = req.body.auth_code;
    const oAuth2Client = await createAuthClient();
  console.log(auth_code);
    oAuth2Client.getToken(auth_code, (err: any, token: any) => {
      if (err) {
        console.error('Error retrieving access token', err);
        return;
      }
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token)).then((_: any) => {
        console.log('Token stored to', TOKEN_PATH);
      });
    });
    return res.status(201).json('Token successfully created');
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(404).send(error);
  }
};

export const getGoogleCalendars = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const listResults: Schema$CalendarList = await getCalendarList();
    const results = listResults.items?.map((item) => ({ id: item.id, summary: item.summary }));
    return res.status(200).json(results);
  } catch
    (error) {
    console.log(`Error: ${error.message}`);
    return res.status(404).send(error);
  }
};


export const createCalendar = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const calendarId = req.body.calendarId;
    const listResults: Schema$CalendarList = await getCalendarList();
    const resultItem = listResults.items?.find((item) => item.id == calendarId);
    let itemCreated: boolean = false;
    if (resultItem) {
      await knex('settings')
        .select()
        .where('calendarId', calendarId)
        .then(function(rows: string) {
          if (rows.length === 0) {
            // no matching records found
            itemCreated = true;
            return knex('settings').insert({
              calendarId,
              summary: resultItem.summary,
            });
          }
        });
      if (itemCreated) {
        return res.status(201).json({
          calendarId,
          summary: resultItem.summary,
        });
      } else {
        return res.status(403)
          .json({ message: `Calendar ${calendarId} already in database ` });
      }
    } else return res.status(422).json({ message: `No calendar was found with ID ${calendarId} in Google Calendars` });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(404).send(error);
  }
};

export const getAllCalendars = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const result = await knex('settings').select('id', 'calendarId', 'summary');
    return res.status(200).json(result);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(404).send(error);
  }
};

export const deleteCalendar = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const id: number = parseInt(req.params.id);
    await knex('settings').where('id', id).del();
    return res
      .status(200)
      .json({ message: `Calendar with ID ${id} has been deleted ` });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(404).send(error);
  }
};


async function createEvent(lesson: ILesson): Promise<calendar_v3.Schema$Event> {

  // '16:00-17:00' split it at the colons
  const timeArray = lesson.time_slot.split('-');
  const teacher = await getTeacherByID(lesson.teacher_id);
  const student = await getStudentByID(lesson.student_id);
  const event: ICalendarEvent = {
    // 'Summary of lesson'
    summary: `Заплановано урок з ${teacher.first_name} ${teacher.last_name} для ${student.first_name} ${student.last_name} @ ${lesson.date} ${lesson.time_slot} ${teacher.emails.toString()} ${student.emails.toString()} `,
    // 'Descripton of lesson in Google Calendar.'
    description: lesson.zoom_link,
    // { 'dateTime': '2021-08-22T16:00:00+02:00', 'timeZone': 'Europe/Kiev',}
    start: {
      'dateTime': `${lesson.date}T${timeArray[0]}:00`,
      'timeZone': 'Europe/Kiev',
    },
    // { 'dateTime': '2021-08-22T18:00:00+02:00', 'timeZone': 'Europe/Kiev' }
    end: {
      'dateTime': `${lesson.date}T${timeArray[1]}:00`,
      'timeZone': 'Europe/Kiev',
    },
    attendees: [
      { 'email': teacher.emails.toString() },
      { 'email': student.emails.toString() },
    ],
    reminders: {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 24 * 60 },
        { 'method': 'popup', 'minutes': 10 },
      ],
    },
    sendUpdates: 'all',
    sendNotifications: true,
  };
  return event;
}

async function insertEvent(event: any) {
  const oAuth2Client = await createAuthClient();
  return await new Promise<void>((resolve, reject) => {
    const calendar = google.calendar({ version: 'v3', oAuth2Client });
    calendar.events.insert({
        auth: oAuth2Client,
        calendarId: 'primary',
        resource: event,
      }, (err: string, event: { data: { htmlLink: any; }; }) => {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          reject(err);
          return;
        }
        console.log('Event created: %s', event.data.htmlLink);
        resolve();
      },
    );
  });
}

export const createLessonInGoogleCalendar = async (
  req: Request,
  res: Response,
): Promise<Response> => {

  try {
    let lesson: ILesson = req.body;
    const eventData = await createEvent(lesson);
    console.log(eventData);
    await insertEvent(eventData);
    return res.json(eventData);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(404).send(error);
  }
};

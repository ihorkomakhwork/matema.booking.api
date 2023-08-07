import { calendar_v3 } from 'googleapis';
import Schema$EventAttendees = calendar_v3.Schema$EventAttendee;
import Schema$EventDateTime = calendar_v3.Schema$EventDateTime;

export default interface ICalendarEvent {
    id?: string;
    summary: string;
    date?: string;
    timeZone?: string;
    description: string;
    attendees?: Schema$EventAttendees[] | object[];
    location?: string;
    start: Schema$EventDateTime;
    end: Schema$EventDateTime;
    reminders: any;
    sendUpdates: string;
    sendNotifications: boolean;
}
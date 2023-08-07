export default interface IReport {
   readonly id: number;
    duration : string;
    emails: string[];
    start_time: string;
    end_time: string;

    lesson_id: number;
}

export default interface ISchedule {
    readonly  id: number;
    teacher_id: number;
    date: string;
    time_slots: number[];
}
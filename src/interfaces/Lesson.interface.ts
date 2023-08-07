import { StatusId } from "../enums/LessonEnums";

export interface ILesson {
    id: number;
    name: string;
    zoom_link: string;
    date: string;
    status: StatusId;
    time_slot: string;
    teacher_id: number;
    teacher_email?: string;
    student_id: number;
    student_email?: string;
    user_id?: number;
}

export interface CreatedLesson {
    name: string;
    zoom_link: string;
    date: string;
    time_slot: string;
    teacher_id: number;
    student_id: number;
}
export interface Schedul {
    date: string;
    time_slots: number[];
    id: number;
    teacher_id: number;
}

export interface NewLesson {
    id: number;
    name: string;
    zoom_link: string;
    date: string;
    time_slot: number[];
    teacher_id: number;
    student_id: number;
    
}

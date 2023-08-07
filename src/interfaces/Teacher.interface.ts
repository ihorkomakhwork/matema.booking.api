import {Status, Profile} from "../enums/TeacherEnums";

export default interface ITeacher {
    emails: string[];
    readonly id: number;
    first_name: string;
    last_name: string;
    patronymic: string;
    phone: string[];
    email: string[];
    status: Status;
    profile: Profile;
    _class: string;
    user_id: number;
}
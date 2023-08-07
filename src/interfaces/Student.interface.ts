import {Class, Task} from "../enums/StudentEnums";

export default interface IStudent {
    readonly id: number;
    first_name: string;
    last_name: string;
    patronymic: string;
    phones?: string[];
    emails: string[];
    goal: string;
    class: Class;
    task: Task;
    client_id: number;
}



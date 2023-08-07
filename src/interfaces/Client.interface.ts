import {Role} from '../enums/ClientEnums'
export default interface IClient {
    id: number;
    name: string;
    last_name: string;
    second_name: string;
    phones?: string[];
    emails?: string[];
    role: Role;
}
import {Role} from "../enums/UserEnums";

export default interface IUser {
    readonly  id: number;
    username: string;
    role: Role;
}
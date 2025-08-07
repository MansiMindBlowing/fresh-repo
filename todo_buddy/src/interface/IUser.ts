import { UserRole } from "enums/UserRole";

export interface IUser{
    id?:string;
    name?:string;
    email?:string;
    password?:string;
    role?:UserRole;
    invited_by?:string;
    created_at?:Date;
    updated_at?:Date;
}
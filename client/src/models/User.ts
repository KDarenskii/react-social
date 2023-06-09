import { ROLES } from "../constants/roles";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: ROLES[];
    friends: string[];
    followings: string[];
    requests: string[];
}

export type TUserDto = Omit<IUser, "id">;

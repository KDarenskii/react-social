import { NOTICE } from "../constants/notice";

export interface INotificationDto {
    firstName: string;
    lastName: string;
    type: NOTICE;
    userId: string;
}

export interface INotification extends INotificationDto {
    date: string;
    id: string;
}

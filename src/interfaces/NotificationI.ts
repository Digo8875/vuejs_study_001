export enum NotificationType {
    SUCCESS,
    WARNING,
    DANGER
}

export interface NotificationI {
    title: string,
    text: string,
    type: NotificationType,
    id: number
}
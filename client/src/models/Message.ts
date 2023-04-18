export interface IMessageDto {
    text: string;
    senderId: string;
    receiverId: string;
    conversationId: string;
}

export interface IMessage extends IMessageDto {
    time: string;
    id: string;
}

import {APP} from '../constants/app';
import {
    ChatType,
    ChatIdType,
    DeleteMessageOptionsType,
    SendMessageOptionsType,
    SendPhotoOptionsType,
    SetChatPhotoOptionsType,
    SetChatTitleOptionsType,
} from '../../types/TelegramType';

type SendPhotosOptionsType = {
    photo: GoogleAppsScript.Base.Blob
    caption?: string
}

type SetChatsTitleOptionsType = {
    /** New chat title, 1-255 characters */
    title: string
}

export interface TelegramServiceInterface {
    sendMessage(options: SendMessageOptionsType): void
    sendMessages(text: string, config: ChatType[]): void
    sendPhoto(options: SendPhotoOptionsType): void
    sendPhotos(options: SendPhotosOptionsType, config: ChatType[]): void
    setChatTitle(options: SetChatTitleOptionsType): void
    setChatsTitle(options: SetChatsTitleOptionsType, config: ChatType[]): void
    setChatPhoto(options: SetChatPhotoOptionsType): void
}

export class TelegramService implements TelegramServiceInterface {
    private url = `https://api.telegram.org/bot${APP.TELEGRAM.API_KEY}`;

    private sendCommand(command: string, options: Record<string, any>) {
        UrlFetchApp.fetch(this.url + '/' + command, {
            method: 'post',
            payload: options,
        });
    }

    sendMessage(options: SendMessageOptionsType) {
        this.sendCommand('sendMessage', options);
    }

    sendMessages(text: string, config: ChatType[]) {
        config.forEach(config => {
            this.sendMessage({...config, text});
        });
    }

    sendPhoto(options: SendPhotoOptionsType) {
        this.sendCommand('sendPhoto', options);
    }

    sendPhotos(options: SendPhotosOptionsType, config: ChatType[]) {
        config.forEach(config => {
            this.sendPhoto({...config, ...options});
        });
    }

    setChatTitle(options: SetChatTitleOptionsType) {
        this.sendCommand('setChatTitle', options);
    }

    setChatsTitle(options: SetChatsTitleOptionsType, config: ChatType[]) {
        config.forEach(config => {
            this.setChatTitle({...config, ...options});
        });
    }

    setChatPhoto(options: SetChatPhotoOptionsType) {
        this.sendCommand('setChatPhoto', options);
    }

    deleteChatPhoto(options: ChatIdType) {
        this.sendCommand('deleteChatPhoto', options);
    }

    deleteMessage(options: DeleteMessageOptionsType) {
        this.sendCommand('deleteMessage', options);
    }

    deleteLastMessage(chatId: string) {
        const response = UrlFetchApp.fetch(this.url + '/getChat', {
            method: 'post',
            payload: {chat_id: chatId},
        });
        const chat = JSON.parse(response.getContentText());
        const lastMessageId = chat.result.last_message.content.id;
        this.deleteMessage({chat_id: chatId, message_id: lastMessageId});
    }
}

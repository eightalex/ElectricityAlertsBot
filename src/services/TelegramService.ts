import {APP} from '../constants/app';
import {TelegramChatType} from '../../types/TelegramChatType';

type SendMessageOptionsType = {
    text: string
    chat_id: string
    disable_notification?: boolean
    message_thread_id?: number
}

export interface TelegramServiceInterface {
    sendMessage(options: SendMessageOptionsType): void
    sendMessages(message: string, config: TelegramChatType[]): void
}

export class TelegramService implements TelegramServiceInterface {
    constructor(
        private urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp,
    ) {}

    sendMessage(options: SendMessageOptionsType) {
        this.urlFetchApp.fetch(`https://api.telegram.org/bot${APP.TELEGRAM.API_KEY}/sendMessage`, {
            method: 'post',
            payload: options,
        });
    }

    sendMessages(message: string, config: TelegramChatType[]) {
        config.forEach(config => {
            this.sendMessage({text: message, ...config});
        });
    }
}

import {APP} from '../constants/app';
import {ChatType, SendMessageOptionsType, SendPhotoOptionsType} from '../../types/TelegramType';

type SendPhotosOptionsType = {
    photo: GoogleAppsScript.Base.Blob
    caption?: string
}

export interface TelegramServiceInterface {
    sendMessage(options: SendMessageOptionsType): void
    sendMessages(text: string, config: ChatType[]): void
    sendPhoto(options: SendPhotoOptionsType): void
    sendPhotos(options: SendPhotosOptionsType, config: ChatType[]): void
}

export class TelegramService implements TelegramServiceInterface {
    private url = `https://api.telegram.org/bot${APP.TELEGRAM.API_KEY}`;

    sendMessage(options: SendMessageOptionsType) {
        UrlFetchApp.fetch(this.url + '/sendMessage', {
            method: 'post',
            payload: options,
        });
    }

    sendMessages(text: string, config: ChatType[]) {
        config.forEach(config => {
            this.sendMessage({...config, text});
        });
    }

    sendPhoto(options: SendPhotoOptionsType) {
        UrlFetchApp.fetch(this.url + '/sendPhoto', {
            method: 'post',
            payload: options,
        });
    }

    sendPhotos(options: SendPhotosOptionsType, config: ChatType[]) {
        config.forEach(config => {
            this.sendPhoto({...config, ...options});
        });
    }
}

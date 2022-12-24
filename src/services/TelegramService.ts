type SendMessageOptionsType = {
    silent: boolean,
}

export interface TelegramServiceInterface {
    sendMessage(message: string, options?: SendMessageOptionsType): void
}

export class TelegramService implements TelegramServiceInterface {
    constructor(
        private urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp,
    ) {}

    sendMessage(message: string, options?: SendMessageOptionsType) {
        const {silent}: SendMessageOptionsType = options || {
            silent: false,
        };

        this.urlFetchApp.fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_API_KEY}/sendMessage`, {
            method: 'post',
            payload: {
                chat_id: process.env.TELEGRAM_CHAT,
                text: message,
                disable_notification: silent,
            }
        });
    }
}

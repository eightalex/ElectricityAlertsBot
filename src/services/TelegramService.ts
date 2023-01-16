type SendMessageOptionsType = {
    text: string
    chat_id: string
    disable_notification?: boolean
    message_thread_id?: number
}

export interface TelegramServiceInterface {
    sendMessage(options: SendMessageOptionsType): void
}

export class TelegramService implements TelegramServiceInterface {
    constructor(
        private urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp,
    ) {}

    sendMessage(options: SendMessageOptionsType) {
        this.urlFetchApp.fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_API_KEY}/sendMessage`, {
            method: 'post',
            payload: options,
        });
    }
}
